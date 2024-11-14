<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require 'db.php';

error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['user_email'])) {
    $userEmail = htmlspecialchars(strip_tags($_POST['user_email']));

    if (empty($userEmail)) {
        echo json_encode(array("status" => "error", "message" => "User email is missing."));
        exit();
    }

    $sql = "SELECT taskName, taskDesc, taskProi, taskStat FROM tasks WHERE user_email = ? AND taskStat = 'Pending'";
    
    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("s", $userEmail);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $tasks = array();
            while ($row = $result->fetch_assoc()) {
                $tasks[] = $row;
            }
            echo json_encode(array("status" => "success", "tasks" => $tasks));
        } else {
            echo json_encode(array("status" => "error", "message" => "No tasks found for this user."));
        }
    } else {
        echo json_encode(array("status" => "error", "message" => "Database query failed: " . $conn->error));
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(array("status" => "error", "message" => "Invalid request or missing parameters."));
}
?>
