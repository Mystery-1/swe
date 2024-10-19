<?php
// deTask.php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *"); // Allow requests from any origin
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Allow specific request methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allow specific headers

// Include database configuration
include('db.php');

// Check if the request method is POST and the task name is provided
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['taskName'])) {
    $taskName = trim($_POST['taskName']); // Remove leading/trailing spaces

    // Log taskName to verify it's being received correctly
    error_log("Deleting task with name: " . $taskName);

    // Sanitize the task name input to prevent SQL injection
    $taskName = htmlspecialchars(strip_tags($taskName));

    // Prepare SQL query to delete the task from the database by task name (case-insensitive)
    $sql = "DELETE FROM tasks WHERE taskName = LOWER(?)";

    // Initialize a prepared statement
    if ($stmt = $conn->prepare($sql)) {
        // Bind the task name to the statement
        $stmt->bind_param("s", $taskName);

        // Execute the prepared statement
        if ($stmt->execute()) {
            // Log a message if the task was deleted successfully
            if ($stmt->affected_rows > 0) {
                error_log("Task deleted successfully.");
                $response = array("status" => "success", "message" => "Task deleted successfully.");
                echo json_encode($response);
            } else {
                // Log if no task was found with that name
                error_log("No task found with the provided name.");
                $response = array("status" => "error", "message" => "No task found with the provided name.");
                echo json_encode($response);
            }
        } else {
            // If an error occurs during execution
            error_log("Error executing delete query: " . $stmt->error);
            $response = array("status" => "error", "message" => "Error deleting task.");
            echo json_encode($response);
        }

        // Close the statement
        $stmt->close();
    } else {
        // If an error occurs while preparing the statement
        error_log("Error preparing the statement: " . $conn->error);
        $response = array("status" => "error", "message" => "Database query failed.");
        echo json_encode($response);
    }

    // Close the database connection
    $conn->close();
} else {
    // If the request is not POST or the task name is missing
    error_log("Invalid request or missing taskName parameter.");
    $response = array("status" => "error", "message" => "Invalid request or missing parameters.");
    echo json_encode($response);
}
?>
