<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
ini_set('display_errors', 0);
error_reporting(0);

$apiKey = "";

function makeRequest($url, $method = 'POST', $data = null, $headers = [])
{
    $ch = curl_init();
    $options = [
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => $headers,
    ];

    if ($method === 'POST') {
        $options[CURLOPT_POST] = true;
        if ($data !== null) {
            $options[CURLOPT_POSTFIELDS] = json_encode($data);
        }
    }

    curl_setopt_array($ch, $options);
    $response = curl_exec($ch);

    if ($response === false) {
        $error = curl_error($ch);
        curl_close($ch);
        die(json_encode([
            'status' => 'error',
            'message' => "CURL Error: $error",
        ]));
    }

    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode >= 400) {
        die(json_encode([
            'status' => 'error',
            'message' => "HTTP Error: $httpCode",
            'response' => $response,
        ]));
    }

    return json_decode($response, true);
}

// Capture the incoming request body
$rawData = file_get_contents('php://input');
$tasks = json_decode($rawData, true);

if (!$tasks) {
    echo json_encode(["status" => "error", "message" => "Invalid input data."]);
    exit;
}
$saudiTimezone = new DateTimeZone("Asia/Riyadh");
$currentDateTime = new DateTime("now", $saudiTimezone); 
$currentDateTime->modify('+30 minutes'); 
$startTime = $currentDateTime->format('H:i'); 

// Combine all tasks into a single message
$taskDescriptions = "";

foreach ($tasks as $index => $task) {
    if ($index === 0) {
        $taskDescriptions .= "Task Name: {$task['name']}\nDescription: {$task['description']}\nPriority: {$task['priority']}\nStart After: $startTime\n\n";
    } else {
        $taskDescriptions .= "Task Name: {$task['name']}\nDescription: {$task['description']}\nPriority: {$task['priority']}\n\n";
    }
}



$messages = [
    ["role" => "system", "content" => "You are a task scheduling assistant. For each task provided, suggest a suitable start time and duration in minutes based on task priority and details. The first task must start at least 30 minutes from now based on Saudi Arabia time (UTC+3). Provide the output strictly in JSON format as an array of tasks, where each task includes 'name', 'startTime', and 'duration'. Do not include any explanatory text or additional formatting outside of the JSON data."]
];

$messages[] = ["role" => "user", "content" => $taskDescriptions];

// Send the data to OpenAI GPT
$chatResponse = makeRequest("https://api.openai.com/v1/chat/completions", 'POST', [
    "model" => "gpt-4",
    "messages" => $messages,
    "max_tokens" => 500,
    "temperature" => 0.7,
], [
    "Authorization: Bearer $apiKey",
    "Content-Type: application/json",
]);

if (isset($chatResponse['choices']) && !empty($chatResponse['choices'])) {
    $assistantContent = $chatResponse['choices'][0]['message']['content'];
    file_put_contents('assistant_response.log', $assistantContent);
    preg_match('/\{(?:[^{}]|(?R))*\}|\[(?:[^\[\]]|(?R))*\]/s', $assistantContent, $matches);

    if (!empty($matches)) {
        $jsonData = json_decode($matches[0], true);
    } else {
        $jsonData = null;
    }

    if ($jsonData && is_array($jsonData)) {
        $updatedTasks = [];

        foreach ($tasks as $task) {
            foreach ($jsonData as $jsonTask) {
                if ($jsonTask['name'] == $task['name']) {
                    $task['startTime'] = $jsonTask['startTime'];
                    $task['duration'] = $jsonTask['duration'];
                    break;
                }
            }
            $updatedTasks[] = $task;
        }

        echo json_encode(["status" => "success", "tasks" => $updatedTasks]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Failed to parse assistant's response as JSON.",
            "assistant_response" => $assistantContent,
        ]);
    }
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to process tasks.",
        "response" => $chatResponse,
    ]);
}



?>
