<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Debugging mode (remove these lines in production)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Database connection
$servername = "localhost";
$username = "root"; // Replace with your database username
$password = ""; // Replace with your database password
$dbname = "car_rental_system"; // Replace with your database name

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]);
    exit;
}

// Get the reservation details from POST request
$model = $_GET['model'] ?? null;
$start_date = $_GET['start_date'] ?? null;
$end_date = $_GET['end_date'] ?? null;
$customer_name = $_GET['customer_name'] ?? null;
$customer_phone = $_GET['customer_phone'] ?? null;

// Validate input
if (empty($model) || empty($start_date) || empty($end_date) || empty($customer_name) || empty($customer_phone)) {
    echo json_encode(["status" => "error", "message" => "All fields are required."]);
    exit;
}

// Validate phone number format (example: US phone number)
$phonePattern = '/^\d{10}$/';
if (!preg_match($phonePattern, $customer_phone)) {
    echo json_encode(["status" => "error", "message" => "Phone number must be a valid 10-digit number."]);
    exit;
}

// Check availability
$sql = "SELECT * FROM car WHERE model = ? AND status = 'active'";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $model);
$stmt->execute();
$res = $stmt->get_result();

if ($res->num_rows === 0) {
    echo json_encode(["status" => "error", "message" => "Car is not available."]);
    exit;
}

// Insert reservation into the database
$sql = "INSERT INTO reservation (car_model, start_date, end_date, customer_name, customer_phone) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssss", $model, $start_date, $end_date, $customer_name, $customer_phone);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Reservation successful!"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
