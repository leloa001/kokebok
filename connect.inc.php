<?php
// MySQL server credentials
$host = "172.31.89.107";
$username = "kokebok";
$password = "P455orD!";
$dbname = "kokebok";

// Create a MySQL connection
$conn = mysqli_connect($host, $username, $password, $dbname);

// Check the connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>