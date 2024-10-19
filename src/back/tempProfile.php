<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'db.php';

if (!$conn) {
    $response['success'] = false;
    $response['message'] = 'Database connection failed.';
    echo json_encode($response);
    exit;
}

ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', '/path/to/php-error.log');
header('Content-Type: application/json');

header("Access-Control-Allow-Origin: *");

$response = [];


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];
    $confirmPassword = $_POST['confirm_password'];

    if (empty($email)) {
        $response['success'] = false;
        $response['message'] = "Email is missing.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['success'] = false;
        $response['message'] = "Invalid email address.";
    } elseif ($password !== $confirmPassword) {
        $response['success'] = false;
        $response['message'] = "Passwords don't match.";
    } else {
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        $sql = "UPDATE users SET password = ? WHERE email = ?";
        if ($stmt = $conn->prepare($sql)) {
            $stmt->bind_param('ss', $hashedPassword, $email);

            if ($stmt->execute()) {
                if ($stmt->affected_rows > 0) {
                    $response['success'] = true;
                    $response['message'] = 'Password has been updated successfully.';
                } else {
                    $response['success'] = false;
                    $response['message'] = 'Email not found.';
                }
            } else {
                $response['success'] = false;
                $response['message'] = 'Error updating password.';
            }
            $stmt->close();
        } else {
            $response['success'] = false;
            $response['message'] = 'Database error.';
        }
    }
} else {
    $response['success'] = false;
    $response['message'] = 'Invalid request method.';
}

echo json_encode($response);
?>
