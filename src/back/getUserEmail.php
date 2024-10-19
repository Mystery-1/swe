<?php
header("Access-Control-Allow-Origin: http://localhost:3000"); // Adjust as needed
header("Access-Control-Allow-Credentials: true"); // Allow credentials
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit();
}

session_start();

if (isset($_SESSION['email'])) {
    echo json_encode(['email' => $_SESSION['email']]);
} else {
    echo json_encode(['error' => 'User not logged in']);
}
?>
