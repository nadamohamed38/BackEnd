 <?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "car_rental_system";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
// Check if required fields are set
if (isset($_POST['fname']) && isset($_POST['lname']) && isset($_POST['email']) && isset($_POST['password'])) {
    $fname = $_POST['fname'];
    $lname = $_POST['lname'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Check if the email already exists
    $stmt = $conn->prepare("SELECT * FROM customer WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Email already exists
        echo json_encode(array("status" => "error", "message" => "Email already registered"));
    } else {
        // Hash the password
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Insert new customer into the database
        $stmt = $conn->prepare("INSERT INTO customer (first_name, last_name, email, password) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $fname, $lname, $email, $hashedPassword);

        if ($stmt->execute()) {
            echo json_encode(array("status" => "success", "message" => "Registration successful"));
        } else {
            echo json_encode(array("status" => "error", "message" => "Error during registration: " . $stmt->error));
        }
    }

    $stmt->close();
} else {
    echo json_encode(array("status" => "error", "message" => "Invalid request"));
}

$conn->close();
?>