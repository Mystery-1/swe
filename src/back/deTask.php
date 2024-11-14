<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: POST, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type, Authorization"); 

include('db.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['taskName'])) {
    $taskName = trim($_POST['taskName']);

    error_log("Deleting task with name: " . $taskName);

    $taskName = htmlspecialchars(strip_tags($taskName));

    $sql = "DELETE FROM tasks WHERE taskName = LOWER(?)";

    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("s", $taskName);

        if ($stmt->execute()) {
            if ($stmt->affected_rows > 0) {
                error_log("Task deleted successfully.");
                $response = array("status" => "success", "message" => "Task deleted successfully.");
                echo json_encode($response);
            } else {
                error_log("No task found with the provided name.");
                $response = array("status" => "error", "message" => "No task found with the provided name.");
                echo json_encode($response);
            }
        } else {
            error_log("Error executing delete query: " . $stmt->error);
            $response = array("status" => "error", "message" => "Error deleting task.");
            echo json_encode($response);
        }
        $stmt->close();
    } else {
        error_log("Error preparing the statement: " . $conn->error);
        $response = array("status" => "error", "message" => "Database query failed.");
        echo json_encode($response);
    }
    $conn->close();
} else {
    error_log("Invalid request or missing taskName parameter.");
    $response = array("status" => "error", "message" => "Invalid request or missing parameters.");
    echo json_encode($response);
}
?>
