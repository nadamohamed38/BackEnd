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

// Check if query_type is set
if (isset($_GET['query_type'])) {
    $query_type = $_GET['query_type'];

    switch ($query_type) {

        case 'searchCars':
            // Get parameters
            $model = isset($_GET['model']) ? $conn->real_escape_string($_GET['model']) : '';
            $year = isset($_GET['year']) ? $conn->real_escape_string($_GET['year']) : '';
            $office_id = isset($_GET['office_id']) ? $conn->real_escape_string($_GET['office_id']) : '';

            // Base query
            $sql = "SELECT * FROM car WHERE status = 'active'";

            // Apply filters if provided
            if (!empty($model)) {
                $sql .= " AND model LIKE '%$model%'";
            }
            if (!empty($year)) {
                $sql .= " AND year = '$year'";
            }
            if (!empty($office_id)) {
                $sql .= " AND office_id = '$office_id'";
            }

          
            break;

        case 'returnCar':
           
                // Step 1: Select cars whose reservation ends today
                $sqlSelect = "
                    SELECT c.plate_id, c.status, r.end_date
                    FROM car c
                    JOIN reservation r ON c.plate_id = r.plate_id
                    WHERE r.end_date = CURDATE();
                ";
        
                $result = $conn->query($sqlSelect);
        
                if ($result->num_rows > 0) {
                    // Step 2: Update the status of these cars to 'active'
                    $sqlUpdate = "
                        UPDATE car
                        SET status = 'active'
                        WHERE plate_id IN (
                            SELECT r.plate_id
                            FROM reservation r
                            WHERE r.end_date = CURDATE()
                        )
                    ";
        
                    if ($conn->query($sqlUpdate) === TRUE) {
                        echo json_encode(["message" => "Car status updated successfully"]);
                    } else {
                        echo json_encode(["error" => "Error updating car: " . $conn->error]);
                    }
                } else {
                    echo json_encode(["message" => "No cars found with reservation ending today."]);
                }
                break;

        case 'CarInfo':
            $office_id = $_GET['office_id'];
            $plate_id = $_GET['plate_id'];
            $year = $_GET['year'];
            $status = $_GET['status'];
            $model = $_GET['model'];
            $name = $_GET['name'];
            $phone = $_GET['phone_number'];
            $start_date = $_GET['start_date'];
            $end_date = $_GET['end_date'];

            $sql = "SELECT * FROM `car` c JOIN `reservation` r ON c.plate_id = r.plate_id AND c.office_id = r.office_id JOIN `customer` cc ON cc.customer_id = r.customer_id WHERE 1=1";
            $sql .= $plate_id ? " AND c.plate_id = '$plate_id'" : '';
            $sql .= $model ? " AND c.model LIKE '%$model%'" : '';
            $sql .= $year ? " AND c.year = '$year'" : '';
            $sql .= $office_id ? " AND c.office_id = '$office_id'" : '';
            $sql .= $status ? " AND c.status = '$status'" : '';
            $sql .= $name ? " AND cc.name LIKE '%$name%'" : '';
            $sql .= $phone ? " AND cc.phone_num =  '$phone'" : '';
            $sql .= $start_date? " AND r.start_date = '$start_date'" : '';
            $sql .= $end_date? " AND r.end_date = '$end_date'" : '';
            break;


        case 'getSP':
                $start_date = $_GET['start_date'];
                $end_date = $_GET['end_date'];
                $day = $_GET['day'];
                $i = $_GET['i'];
                
                if ($i === '1') {
                    
                    $sql = "SELECT 
                             c.plate_id, 
                            c.status, 
                            CASE 
                            WHEN r.start_date <= '$day' AND r.end_date >= '$day' THEN 'rented' 
                             ELSE c.status 
                            END AS availability_status 
                            FROM car c 
                            LEFT JOIN reservation r 
                            ON c.plate_id = r.plate_id
                            ORDER BY c.plate_id;";
                } else {
                    $sql = "SELECT r.start_date, SUM(r.cost) AS total_payments
                            FROM reservation r
                            WHERE start_date BETWEEN '$start_date' AND '$end_date'
                            GROUP BY  r.start_date";
                }
                break;
            

        case 'getRes':
            $plate_id = $_GET['plate_id'];
            $year = $_GET['year'];
            $model = $_GET['model'];
            $start_date = $_GET['start_date'];
            $end_date = $_GET['end_date'];
            $status = $_GET['status'];
            $name = $_GET['name'];
            $phone = $_GET['phone_number'];
            $x = $_GET['x'];
            
            if (!$start_date && !$end_date && $x == 0) {
                echo json_encode(["error" => "enter period"]);
                exit;
            }
            if($x==0){
                $sql = "SELECT * FROM `car` c JOIN `reservation` r ON c.plate_id = r.plate_id AND c.office_id = r.office_id JOIN `customer` cc ON cc.customer_id = r.customer_id  WHERE 1=1";
            $sql .= $plate_id ? " AND c.plate_id = '$plate_id'" : '';
            $sql .= $model ? " AND c.model LIKE '%$model%'" : '';
            $sql .= $year ? " AND c.year = '$year'" : '';
            $sql .= $status ? " AND c.status = '$status'" : '';
            $sql .= $start_date? " AND r.start_date >= '$start_date'" : '';
            $sql .= $end_date? " AND r.end_date <= '$end_date'" : '';
            }
            else{
                $sql = "SELECT * FROM `car` c JOIN `reservation` r ON c.plate_id = r.plate_id AND c.office_id = r.office_id JOIN `customer` cc ON cc.customer_id = r.customer_id  WHERE 1=1";
                $sql .= $name ? " AND cc.name LIKE '%$name%'" : '';
                $sql .= $phone ? " AND cc.phone_num =  '$phone'" : '';
            }
            break;
    
         case 'searchAvailableCars':
                $model = isset($_GET['model']) ? $_GET['model'] : '';
                $year = isset($_GET['year']) ? $_GET['year'] : '';
                $status = isset($_GET['status']) ? $_GET['status'] : '';
                $office_id = isset($_GET['office_id']) ? $_GET['office_id'] : '';
    
                $sql = "SELECT * FROM car WHERE 1=1";
                $sql .= $model ? " AND model LIKE '%$model%'" : '';
                $sql .= $year ? " AND year = '$year'" : '';
                $sql .= $status ? " AND status = '$status'" : '';
                $sql .= $office_id ? " AND office_id = '$office_id'" : '';
    
                $result = $conn->query($sql);
                if ($result->num_rows > 0) {
                    $data = [];
                    while ($row = $result->fetch_assoc()) {
                        $data[] = $row;
                    }
                    echo json_encode($data);
                } else {
                    echo json_encode([]);
                }
                break;
        case 'updateCar':
                // Required field
                $plate_id = $_GET['plate_id'];
            
                // Optional fields
                $office_id = $_GET['office_id'];
                $year = $_GET['year'];
                $status = $_GET['status'];
                $model = $_GET['model'];
            
                if (!$plate_id) {
                    echo json_encode(["error" => "Plate ID is required for updating car information"]);
                    break;
                }

                $sql = "SELECT * FROM `car` WHERE plate_id = '$plate_id'";
                $res = $conn->query($sql);
                
                if ($res->num_rows == 0) {
                    $res = 0;
                    echo json_encode(["error" => "Plate ID is Not Valid"]);
                    break;
                } 
            
                $res = 1;
                $sql = "UPDATE `car` SET ";
                $updates = [];
                if ($model) {
                    $updates[] = "model = '$model'";
                }
                if ($year) {
                    $updates[] = "`year` = '$year'";
                }
                if ($status) {
                    $updates[] = "`status` = '$status'";
                }
                if ($office_id) {
                    $updates[] = "office_id = '$office_id'";
                }
            
                
                break;
            
        

            
        case 'addCar':
                    $office_id = $_GET['office_id'];
                    $plate_id = $_GET['plate_id'];
                    $year = $_GET['year'];
                    $status = $_GET['status'];
                    $model = $_GET['model'];
                
                    $checkCar = "SELECT * FROM car WHERE plate_id = ?";
                    $stmt = $conn->prepare($checkCar);
                    $stmt->bind_param("s", $plate_id);
                    $stmt->execute();
                    $result = $stmt->get_result();
                
                    if ($result->num_rows > 0) {
                        echo json_encode(["error" => "Car with this Plate ID already exists"]);
                        exit;
                    }
                    
                    if(!$plate_id || !$office_id || !$year || !$status||!$model){
                        echo json_encode(["error" => "please enter all informations"]);
                        exit;
                    }
                    
                    $insertCar = "INSERT INTO car (plate_id, model, `year`, `status`, office_id) VALUES (?, ?, ?, ?, ?)";
                    $stmt = $conn->prepare($insertCar); 
                    $stmt->bind_param("sssss", $plate_id, $model, $year, $status, $office_id);
                
                    
                    if ($stmt->execute() === true) {
                        echo json_encode(["message" => "Car added successfully"]);
                    } else {
                        echo json_encode(["error" => "Error adding car: " . $stmt->error]);
                    }
                

                    $stmt->close();
                    break;
                
                    
                    
        default:
            echo json_encode(["error" => "Invalid query type"]);
            exit;
}  

if($query_type == "updateCar" && $res == 1){
    if (!empty($updates)) {
        $sql .= implode(", ", $updates);
        $sql .= " WHERE plate_id = '$plate_id'";
       
        
        if ($conn->query($sql) === TRUE) {
            echo json_encode(["message" => "Car information updated successfully"]);
        } else {
            echo json_encode(["error" => "Error updating car: " . $conn->error]);
        }
    } else {
        echo json_encode(["error" => "No fields provided for update"]);
    }
}
else if($query_type != "updateCar" && $query_type != "addCar" && $query_type != "returnCar"){
    $result = $conn->query($sql);

if ($result->num_rows > 0) {
    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode($data);
} else {
    echo json_encode([]);
}
} 
}

else {
    echo json_encode(["error" => "No query type provided"]);
}

$conn->close();
?>