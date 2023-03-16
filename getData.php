<?php
include_once 'connect.inc.php';


// Build SQL query
$sql = "SELECT navn, ingredienser FROM oppskrifter";

// Execute query
$result = mysqli_query($conn, $sql);

// Initialize data array
$data = array();

// Output data of each row
if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
      $data[] = array(
        'rettNavn' => $row["navn"], 
        'ingredienser' => $row['ingredienser']
      );
    }
} else {
    echo "0 results";
}

// Encode data as JSON
$json = json_encode($data);

// Set content type header to JSON
header('Content-Type: application/json');

// Output JSON
echo $json;

// Close connection
mysqli_close($conn);
?>