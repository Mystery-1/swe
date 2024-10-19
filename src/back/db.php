<?php
$host = 'localhost';  
$user = 'root';       
$pass = 'mysql';           
$db_name = 'react_php_app'; 
$conn = new mysqli($host, $user, $pass, $db_name);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
