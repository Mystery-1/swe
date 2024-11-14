<?php

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type");

require 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['taskName']) && isset($_POST['taskDesc']) && isset($_POST['taskProi']) && isset($_POST['taskStat']) && isset($_POST['user_email'])) {
    $taskName = $_POST['taskName'];
    $taskDesc = $_POST['taskDesc'];
    $taskProi = $_POST['taskProi'];
    $taskStat = $_POST['taskStat'];
    $userEmail = $_POST['user_email'];

    $taskName = htmlspecialchars(strip_tags($taskName));
    $taskDesc = htmlspecialchars(strip_tags($taskDesc));
    $taskProi = htmlspecialchars(strip_tags($taskProi));
    $taskStat = htmlspecialchars(strip_tags($taskStat));
    $userEmail = htmlspecialchars(strip_tags($userEmail));

    $sql = "INSERT INTO tasks (taskName, taskDesc, taskProi, taskStat, user_email) VALUES (?, ?, ?, ?, ?)";

    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("sssss", $taskName, $taskDesc, $taskProi, $taskStat, $userEmail);

        if ($stmt->execute()) {
            $response = array("status" => "success", "message" => "Task added successfully.");
            echo json_encode($response);
        } else {
            $response = array("status" => "error", "message" => "Error adding task.");
            echo json_encode($response);
        }

        $stmt->close();
    } else {
        $response = array("status" => "error", "message" => "Database query failed.");
        echo json_encode($response);
    }

    $conn->close();
} else {
    $response = array("status" => "error", "message" => "Invalid request or missing parameters.");
    echo json_encode($response);
}
?>
