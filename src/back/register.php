<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(); 
}

require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    error_log("Received signup request");

    $name = isset($_POST['name']) ? $_POST['name'] : '';
    $email = isset($_POST['email']) ? $_POST['email'] : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';

    if (empty($name) || empty($email) || empty($password)) {
        echo json_encode(['status' => 'error', 'message' => 'All fields are required']);
        error_log("Missing required fields");
        exit();
    }

    $check_query = "SELECT * FROM users WHERE email=?";
    $stmt = $conn->prepare($check_query);
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo json_encode(['status' => 'error', 'message' => 'Email already exists']);
        error_log("Email already exists: $email");
        exit();
    }

    $hashed_password = password_hash($password, PASSWORD_BCRYPT);

    $insert_query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($insert_query);
    $stmt->bind_param('sss', $name, $email, $hashed_password);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'User registered successfully']);
        error_log("User registered successfully: $email");
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Registration failed']);
        error_log("Registration failed: " . $stmt->error);
    }
}
?>
