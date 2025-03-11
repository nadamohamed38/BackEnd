var back = 0;
returnCar();
function returnCar() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost/final/search.php?query_type=returnCar", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) { // Ensure both equality operators (===) and proper conditions
            try {
                var results = JSON.parse(xhr.responseText); // Parse JSON response
                console.log(results); // Log the results
            } catch (e) {
                console.error("Invalid JSON:", e, xhr.responseText); // Catch any JSON parse errors
            }
        }
    };

    xhr.send(); // Send the HTTP request
}


function main() {
    $('.main').show();
    $('.office').hide();
    $('.customer').hide();
    back = 0;
}
function toggleForms() {
    const loginForm = document.querySelector('.login');
    const registerForm = document.querySelector('.Register');

    if (loginForm.style.display === 'none') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display='block';}}

function office() { 
    $('.main').hide();
    $('.update').hide();
    $('.search').hide();
    $('.search_main').hide();
    $('.add').hide();
    $('.mainForm').hide();
    $('.office').slideDown(2000, "swing");
    $('.office_main').show();
    back = 1;
}

function customer() { 
    $('.main').hide();
    $('.customer').slideDown(2000, "swing");
    $('.login').hide();
    $('.Register').hide();
    $('.Reserve').hide();
    $('.searchCar').hide();
    $('.customer_main').show();
    $('.reservation').hide();
    back = 1;
}

function showLogin() {
    $('.customer_main').hide();
    //$('.login').show();
    $('.reservation').show();
    back = 8;
}
function hideLogin() {
    $('.login').hide();
}
function showRegister() {
    $('.customer_main').hide();
    $('.Register').show();
    back = 8;
}
function showReservation() {
    $('.customer_main').hide();
    $('.reservation').show();
    displayCarResults();
    
    back = 8;
}

function showSearchCar() {
    $('.customer_main').hide();
    $('.searchCar').show();
    back = 8;
}

function showAdd() {
    $('.office_main').hide();
    $('.add').show();
    back = 2;
}


function showUpdate() {
    $('.office_main').hide();
    $('.update').show();
    back = 2;
}

function showSearch() {
    $('.office_main').hide();
    $('.search').show();
    $('.search_main').show();
    $('.mainForm').hide();
    back = 2;
}

function reservedCars() {
    back = 5;
    $('.search_main').hide();
    $('.mainForm').show();
    document.getElementById('tableRes').innerHTML = "";

    document.getElementById("row").innerHTML = `
        <h2 class="m-2">Search For Reservations</h2>
        <div class="my-5" id="alerttt"></div>
        <h5 class="m-2">Enter Period:</h5>
        <div class="col-md-6 mb-2 ">
            <label for="start_date" class="form-label">Start Date</label>
            <input type="date" class="form-control" id="start_date" placeholder="">
        </div>
        <div class="col-md-6 mb-2 ">
            <label for="end_date" class="form-label">End Date</label>
            <input type="date" class="form-control" id="end_date" placeholder="">
        </div>
        <div class="container">
            <div class="row g-2">
                <div class="col-md-6">
                    <h5 class="fw-bold">Enter Car Specifications:</h5>
                    <div class="col-md-6 mb-2 ">
                        <label for="splate_id" class="form-label">Plate ID</label>
                        <input type="text" class="form-control" id="splate_id" placeholder="ex:1234abcd">
                    </div>
                    <div class="col-md-6 mb-2 ">
                        <label for="syear" class="form-label">Year</label>
                        <input type="text" class="form-control" id="syear" placeholder="2004">
                    </div>
                    <div class="col-md-6 mb-2 ">
                        <label for="smodel" class="form-label">Model</label>
                        <input type="text" class="form-control" id="smodel" placeholder="Toyota">
                    </div>
                    <div class="col-md-6 mb-2 ">
                        <label for="sstatus" class="form-label">Status</label>
                        <input type="text" class="form-control" id="sstatus" placeholder="active, rented or out of service">
                    </div>
                    <div class="col-1 mb-2 ">
                        <button class="btn btn-warning text-white px-5" type="submit" onclick="getRes(0)">Search</button>
                    </div>
                </div>

                <div class="col-md-6">
                    <h5 class="fw-bold">Enter Customer Information:</h5>
                    <div class="col-md-6 mb-2 ">
                        <label for="sname" class="form-label">Customer Name</label>
                        <input type="text" class="form-control" id="sname" placeholder="name">
                    </div>
                    <div class="col-md-6 mb-2 ">
                        <label for="sphone_number" class="form -label">Customer Phone Number</label>
                        <input type="tel" class="form-control" id="sphone_number" placeholder="ex:012 34567898">
                    </div>
                    <div class="col-3 mb-2 ">
                        <button class="btn btn-warning text-white" type="submit" onclick="getRes(1)">Search for Customer</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function advancedSearch() {
    back = 6;
    $('.search_main').hide();
    $('.mainForm').show();
    document.getElementById('tableRes').innerHTML = "";

    document.getElementById("row").innerHTML = `
        <h2>Advanced Search</h2>
        <div class="col-md-6 mb-2 ">
            <label for="soffice_id" class="form-label">Office ID</label>
            <input type="text" class="form-control" id="soffice_id" placeholder="office_id">
        </div>
        <div class="col-md-6 mb-2 ">
            <label for="splate_id" class="form-label">Plate ID</label>
            <input type="text" class="form-control" id="splate_id" placeholder="ex:1234abcd">
        </div>
        <div class="col-md-6 mb-2 ">
            <label for="syear" class="form-label">Year</label>
            <input type="text" class="form-control" id="syear" placeholder="2004">
        </div>
        <div class="col-md-6 mb-2 ">
            <label for="smodel" class="form-label">Model</label>
            <input type="text" class="form-control" id="smodel" placeholder="Toyota">
        </div>
        <div class="col-md-6 mb-2 ">
            <label for="sstatus" class="form-label">Status</label>
            <input type="text" class="form-control" id="sstatus" placeholder="active, rented or out of service">
        </div>
        <div class="col-md-6 mb-2 ">
            <label for="sname" class="form-label">Customer Name</label>
            <input type="text" class="form-control" id="sname" placeholder="name">
        </div>
        <div class="col-md-6 mb-2 ">
            <label for="sphone_number" class="form-label">Customer Phone Number</label>
            <input type="tel" class="form-control" id="sphone_number" placeholder="ex:01234567898">
        </div>
        <div class="col-md-6 mb-2 ">
            <label for="start_date" class="form-label">Start Date</label>
            <input type="date" class="form-control" id="start_date" placeholder="">
        </div>
        <div class="col-md-6 mb-2 ">
            <label for="end_date" class="form-label">End Date</label>
            <input type="date" class="form-control" id="end_date" placeholder="">
        </div>
        <br>
        <div class="col-1 mb-2 ">
            <button class="btn btn-warning text-white px-5" type="button" onclick="getInfo()">Search</button>
        </div>
    `;
}

function SearchSP() {
    back = 7;
    $('.search_main').hide();
    $('.mainForm').show();
    document.getElementById('tableRes').innerHTML = "";
    document.getElementById("row").innerHTML = `
        <div class="col-md-6 mb-2 ">
            <h4>All Cars Status:</h4>
            <div class="m-2 ">
                <label for="day" class="form-label">Enter Day</label>
                <input type="date" class="form-control" id="day" placeholder="">
            </div>
            <button class="btn btn-warning text-white px-5" type="button" onclick="getSP(1)">Get Status</button>
        </div>
        <div class="col-md-6 mb-2 ">
            <h4>All Payments Within a Period:</h4>
            <div class="col-md-6 mb-2 ">
                <label for="start_date" class="form-label">Start Date</label>
                <input type="date" class="form-control" id="start_date" placeholder="">
            </div>
            <div class="col-md-6 mb-2 ">
                <label for="end_date" class="form-label ">End Date</label>
                <input type="date" class="form-control" id="end_date" placeholder="">
            </div>
            <button class="btn btn-warning px-5 text-white" type="button" onclick="getSP(2)">Get Payments</button>
        </div>
    `;
}

function getInfo() {
    var office_id = document.getElementById('soffice_id').value.trim();
    var plate_id = document.getElementById('splate_id').value.trim();
    var year = document.getElementById('syear').value.trim();
    var statuss = document.getElementById('sstatus').value.trim();
    var model = document.getElementById('smodel').value.trim();
    var name = document.getElementById('sname').value.trim();
    var tel = document.getElementById('sphone_number').value.trim();
    var start_date = document.getElementById('start_date').value.trim();
    var end_date = document.getElementById('end_date').value.trim();

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost/final/search.php?query_type=CarInfo&office_id=" + encodeURIComponent(office_id) + 
    "&plate_id=" + encodeURIComponent(plate_id) + "&year=" + encodeURIComponent(year) + "&status=" + encodeURIComponent(statuss) +
    "&model=" + encodeURIComponent(model) + "&name=" + encodeURIComponent(name) + "&phone_number=" + encodeURIComponent(tel) +
    "&start_date=" + encodeURIComponent(start_date) + "&end_date=" + encodeURIComponent(end_date), true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var results = JSON.parse(xhr.responseText);
            displayResults(results);
            console.log(results);
        }
    };
    xhr.send();
}

function getRes(x) {
    var plate_id = document.getElementById('splate_id').value.trim();
    var year = document.getElementById('syear').value.trim();
    var model = document.getElementById('smodel').value.trim();
    var start_date = document.getElementById('start_date').value.trim();
    var end_date = document.getElementById('end_date').value.trim();
    var statuss = document.getElementById('sstatus').value.trim();
    var name = document.getElementById('sname').value.trim();
    var tel = document.getElementById('sphone_number').value.trim();

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost/final/search.php?query_type=getRes&plate_id=" + encodeURIComponent(plate_id) + "&year=" + encodeURIComponent(year) + "&model=" +
    encodeURIComponent(model) + "&start_date=" + encodeURIComponent(start_date) + "&end_date=" + encodeURIComponent(end_date) + "&status=" + encodeURIComponent(statuss) +
    "&name=" + encodeURIComponent(name) + "&phone_number=" + encodeURIComponent(tel) + "&x=" + encodeURIComponent(x), true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var results = JSON.parse(xhr.responseText);
            console.log(results);
            if (results.error) {
                document.getElementById("alerttt").innerHTML = `<div class="alert alert-danger" role="alert">Error: ${results.error}</div>`;
            } else {
                document.getElementById("alerttt").innerHTML = "";
                if (x == 0 && (plate_id != "" || model != "" || statuss != "" || year != "")) {
                    displayCarResults(results);
                } else if (x == 1) {
                    displayCustomerResults(results);
                } else {
                    displayResults(results);
                }
            }
        }
    };
    xhr.send();
}

function getSP(i) {
    var day = document.getElementById('day').value.trim();
    var start_date = document.getElementById('start_date').value.trim();
    var end_date = document.getElementById('end_date').value.trim();

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost/final/search.php?query_type=getSP&day=" + encodeURIComponent(day) + "&start_date=" + encodeURIComponent(start_date) + "&end_date=" + encodeURIComponent(end_date) + "&i=" + encodeURIComponent(i), true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var results = JSON.parse(xhr.responseText);
            console.log(results);
            i == 1 ? displayStatus(results) : displayPayment(results);
        }
    };
    xhr.send();
}

function addCar() {
    var office_id = document.getElementById('aoffice_id').value.trim();
    var plate_id = document.getElementById('aplate_id').value.trim();
    var year = document.getElementById('ayear').value.trim();
    var statuss = document.getElementById('astatus').value.trim();
    var model = document.getElementById('amodel').value.trim();

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost/final/search.php?query_type=addCar&office_id=" + encodeURIComponent(office_id) + 
    "&plate_id=" + encodeURIComponent(plate_id) + "&year=" + encodeURIComponent(year) + "&status=" + encodeURIComponent(statuss) +
    "&model=" + encodeURIComponent(model), true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            try {
                var results = JSON.parse(xhr.responseText);
                console.log(results);
                document.getElementById("alertAdd").innerHTML = results.error ? `<div class="alert alert-danger" role="alert">Error: ${results.error}</div>` :
                `<div class="alert alert-warning" role="alert">Car added successfully</div>`;
            } catch (e) {
                console.error("Invalid JSON:", e, xhr.responseText);
            }
        }
    };
    xhr.send();
}
function searchCars() {
    
    
    const year = document.getElementById('yyear').value.trim();
    const model = document.getElementById('ymodel').value.trim();
    const officeId = document.getElementById('yoffice_id').value.trim();
    const alertSearchCar = document.getElementById('alertSearchCar');
    const resultsBody = document.getElementById('ResultsTable');
    resultsBody.innerHTML = `<thead>
                        <tr>
                            <th>Plate ID</th>
                            <th>Model</th>
                            <th>Year</th>
                            <th>Status</th>
                            <th>Office ID</th>
                        </tr>
                        
                    </thead>`; // Clear previous results

    if (!year && !model && !officeId) {
        document.getElementById("alertSearchCar").innerHTML = `<div class="alert alert-danger" role="alert">Please fill in all fields</div>`;
        return;
    }
    if (year && !/^\d{4}$/.test(year)) {
        alertMessage.innerHTML = '<div class="alert alert-danger">Year must be a valid 4-digit number.</div>';
        return;
    }

    if (model && !/^[a-zA-Z0-9\s]+$/.test(model)) {
        alertMessage.innerHTML = '<div class="alert alert-danger">Model can only contain letters, numbers, and spaces.</div>';
        return;
    }


    if (officeId && !/^\d+$/.test(officeId)) {
        alertMessage.innerHTML = '<div class="alert alert-danger">Office ID must be a valid number.</div>';
        return;
    }
 

    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost/final/search.php?query_type=searchCars&year="+encodeURIComponent(year)+"&model="+encodeURIComponent(model)+"&office_id="+encodeURIComponent (officeId), true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200 ) {
            const results = JSON.parse(xhr.responseText);
            console.log(results);
            
            

            if (results.length > 0) {
                results.forEach(car => {
                    
                    
                    const row = `
                     
                    <tbody id="resultsBody">
                        
                   
                    <tr>
                                    <td>${car.plate_id}</td>
                                    <td>${car.model}</td>
                                    <td>${car.year}</td>  
                                    <td>${car.status}</td>               
                                    <td>${car.office_id}</td>
                                 </tr>
                                  </tbody>`;
                    resultsBody.innerHTML += row;
                });
            } else {
                resultsBody.innerHTML = `<tr><td colspan="5" class="text-center">No available cars found.</td></tr>`;
            }
        }
    };

    // Send the search request
    xhr.send();
}
function makeReservation() {
    const model = document.getElementById('car_model').value;
    const startDate = document.getElementById('reservation_start_date').value;
    const endDate = document.getElementById('reservation_end_date').value;
    const customerName = document.getElementById('customer_name').value.trim();
    const customerPhone = document.getElementById('customer_phone').value.trim();
    const alertReserve = document.getElementById('alertreserve');
    alertReserve.innerHTML = '';

    // Validate required fields
    if (!model || !startDate || !endDate || !customerName || !customerPhone) {
        alertReserve.innerHTML = `<div class="alert alert-danger" role="alert">Please fill in all fields.</div>`;
        return;
    }

    // Validate date range
    if (new Date(startDate) >= new Date(endDate)) {
        alertReserve.innerHTML = `<div class="alert alert-danger" role="alert">End date must be after start date.</div>`;
        return;
    }

    // Validate phone number format (example: US phone number)
    const phonePattern = /^\d{10}$/; // Adjust the pattern as needed
    if (!phonePattern.test(customerPhone)) {
        alertReserve.innerHTML = `<div class="alert alert-danger" role="alert">Phone number must be a valid 10-digit number.</div>`;
        return;
    }
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost/final/reserve.php?model=" + encodeURIComponent(model) + 
    "&start_date=" + encodeURIComponent(startDate) + "&end_date=" + encodeURIComponent(endDate) + "&customer_name=" + encodeURIComponent(customerName) +
    "&customer_phone=" + encodeURIComponent(customerPhone), true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var results = JSON.parse(xhr.responseText);
            if (results.status === "success") {
                alertReserve.innerHTML = `<div class="alert alert-success">Reservation made for ${model} from ${startDate} to ${endDate}.</div>`;
                resetForm();
            } else {
                alertReserve.innerHTML = `<div class="alert alert-danger">Error: ${results.message}</div>`;
            }
        }
    };
    xhr.send();


}
function resetForm() {
    document.getElementById('car_model').value = '';
    document.getElementById('reservation_start_date').value = '';
    document.getElementById('reservation_end_date').value = '';
    document.getElementById('customer_name').value = '';
    document.getElementById('customer_phone').value = '';
}
function updateCar() {
    var office_id = document.getElementById('uoffice_id').value.trim();
    var plate_id = document.getElementById('uplate_id').value.trim();
    var year = document.getElementById('uyear').value.trim();
    var statuss = document.getElementById('ustatus').value.trim();
    var model = document.getElementById('umodel').value.trim();
    
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost/final/search.php?query_type=updateCar&office_id=" + encodeURIComponent(office_id) + 
    "&plate_id=" + encodeURIComponent(plate_id) + "&year=" + encodeURIComponent(year) + "&status=" + encodeURIComponent(statuss) +
    "&model=" + encodeURIComponent(model), true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            try {
                var results = JSON.parse(xhr.responseText);
                console.log(results);
                document.getElementById("alertt").innerHTML = results.error ? `<div class="alert alert-danger" role="alert">Error: ${results.error}</div>` :
                `<div class="alert alert-warning" role="alert">${results.message}</div>`;
            } catch (e) {
                console.error("Invalid JSON:", e, xhr.responseText);
            }
        }
    };
    xhr.send();
}

function loginCustomer() {
    document.getElementById("alertLogin").innerHTML = "";
    var email = document.getElementById('login_email').value.trim();
    var password = document.getElementById('login_pass').value.trim();

    if (!email || !password) {
        document.getElementById("alertLogin").innerHTML = `<div class="alert alert-danger" role="alert">Please fill in all fields</div>`;
        return;
    }
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById("alertLogin").innerHTML = `<div class="alert alert-danger" role="alert">Invalid email format</div>`;
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost/final/login.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var results = JSON.parse(xhr.responseText);
            if (results.status === "error") {
                document.getElementById("alertLogin").innerHTML = `<div class="alert alert-danger" role="alert">Error: ${results.message}</div>`;
            } else if (results.status === "success") {
                document.getElementById("alertLogin").innerHTML = `<div class="alert alert-success" role="alert">Login successful!</div>`;
                hideLogin();
                showReservation();
                // Redirect or load customer dashboard
            }
        }
    };
    xhr.send("email=" + encodeURIComponent(email) + "&password=" + encodeURIComponent(password));
}

function addCustomer() {
    var fname = document.getElementById('register_fname').value.trim();
    var lname = document.getElementById('register_lname').value.trim();
    var email = document.getElementById('register_email').value.trim();
    var password = document.getElementById('register_pass').value.trim();
    var confirmPassword = document.getElementById('confirm_pass_id').value.trim();

    if (password !== confirmPassword) {
        document.getElementById("alertRegister").innerHTML = `<div class="alert alert-danger" role="alert">Passwords do not match!</div>`;
        return;
    }
    if (!fname || !lname || !email || !password || !confirmPassword) {
        alertRegister.innerHTML = `<div class="alert alert-danger" role="alert">All fields are required!</div>`;
        return;
    }

    // Validate email format
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alertRegister.innerHTML = `<div class="alert alert-danger" role="alert">Invalid email format!</div>`;
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost/final /register.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var results = JSON.parse(xhr.responseText);
            if (results.error) {
                document.getElementById("alertRegister").innerHTML = `<div class="alert alert-danger" role="alert">Error: ${results.error}</div>`;
            } else {
                document.getElementById("alertRegister").innerHTML = `<div class="alert alert-success" role="alert">Registration successful!</div>`;
                // Optionally redirect or load customer dashboard
            }
        }
    };
    xhr.send("fname=" + encodeURIComponent(fname) + "&lname=" + encodeURIComponent(lname) + "&email=" + encodeURIComponent(email) + "&password=" + encodeURIComponent(password));
}
function displayResultsCustomer(results) {
    const resultsBody = document.getElementById('resultsBody');
    resultsBody.innerHTML = ''; // Clear previous results

    if (results.length === 0) {
        resultsBody.innerHTML = '<tr><td colspan="5">No available cars found.</td></tr>';
        return;
    }

    results.forEach(car => {
        const row = document.createElement('tr');
        row.innerHTML = `<tr>
        <td>${car.plate_id}</td>
            <td>${car.model}</td>
            <td>${car.year}</td>
            <td>${car.status}</td>
            <td>${car.office_id}</td>
        </tr>
            
        `;
        resultsBody.appendChild(row);
    });
}
function displayResults(results) {
   
    var table = document.getElementById('tableRes');
    var temp = `<thead>
                                <tr>
                                  <th scope="col">office id</th>
                                  <th scope="col">plate id</th>
                                  <th scope="col">model</th>
                                  <th scope="col">year</th>
                                  <th scope="col">status</th>
                                  <th scope="col">customer id</th>
                                  <th scope="col">customer name</th>
                                  <th scope="col">phone number</th>
                                  <th scope="col">rented from</th>
                                  <th scope="col">rented to</th>
                                </tr>
                              </thead>
                              <tbody id="sresult"></tbody>`
    table.innerHTML = temp
    var resultsContainer = document.getElementById('sresult');
    resultsContainer.innerHTML = ''; 
    temp = ''
    if (results.length > 0) {
        results.forEach(function(result) {
            temp+=`<tr>
      <td>${result.office_id}</td>
      <td>${result.plate_id}</td>
      <td>${result.model}</td>
      <td>${result.year}</td>
      <td>${result.status}</td>
      <td>${result.customer_id}</td>
      <td>${result.name}</td>
      <td>${result.phone_num}</td>
      <td>${result.start_date}</td>
      <td>${result.end_date}</td>
    </tr>`
        });
    } 

    resultsContainer.innerHTML = temp;

}


function displayCarResults(results) {
    document.getElementById("alerttt").innerHTML =""
    var table = document.getElementById('tableRes');
    var temp = `<thead>
                                <tr>
                                  <th scope="col">office id</th>
                                  <th scope="col">plate id</th>
                                  <th scope="col">model</th>
                                  <th scope="col">year</th>
                                  <th scope="col">status</th>
                                </tr>
                              </thead>
                              <tbody id="sresult"></tbody>`
    table.innerHTML = temp
    var resultsContainer = document.getElementById('sresult');
    resultsContainer.innerHTML = ''; 
    temp = ''
    if (results.length > 0) {
        results.forEach(function(result) {
            temp+=`<tr>
      <td>${result.office_id}</td>
      <td>${result.plate_id}</td>
      <td>${result.model}</td>
      <td>${result.year}</td>
      <td>${result.status}</td>
    </tr>`
        });
    } 

    resultsContainer.innerHTML = temp;

}

function displayCustomerResults(results) {
    document.getElementById("alerttt").innerHTML =""
    var table = document.getElementById('tableRes');
    var temp = `<thead>
                                <tr>
                                  <th scope="col">customer id</th>
                                  <th scope="col">customer name</th>
                                  <th scope="col">phone number</th>
                                  <th scope="col">plate id</th>
                                  <th scope="col">model</th>
                                  
                                  
                                </tr>
                              </thead>
                              <tbody id="sresult"></tbody>`
    table.innerHTML = temp
    var resultsContainer = document.getElementById('sresult');
    resultsContainer.innerHTML = ''; 
    temp = ''
    if (results.length > 0) {
        results.forEach(function(result) {
            temp+=`<tr>
       <td>${result.customer_id}</td>
      <td>${result.name}</td>
      <td>${result.phone_num}</td>
      <td>${result.plate_id}</td>
      <td>${result.model}</td>
    </tr>`
        });
    } 

    resultsContainer.innerHTML = temp;

}

function displayStatus(results) {
    var table = document.getElementById('tableRes');
    var temp = `<thead>
                                <tr>
                                  <th scope="col">plate id</th>
                                  <th scope="col">status</th>
                                </tr>
                              </thead>
                              <tbody id="sresult"></tbody>`
    table.innerHTML = temp
    var resultsContainer = document.getElementById('sresult');
    resultsContainer.innerHTML = ''; 
    temp = ''
    if (results.length > 0) {
        results.forEach(function(result) {
            temp+=`<tr>
            <td>${result.plate_id}</td>
            <td>${result.availability_status}</td> 
      </tr>`
        });
    } 

    resultsContainer.innerHTML = temp;
}

function displayPayment(results) {
    var table = document.getElementById('tableRes');
    var temp = `<thead>
                                <tr>
                                  <th scope="col">Day</th>
                                  <th scope="col">Total Payment</th>
                                </tr>
                              </thead>
                              <tbody id="sresult"></tbody>`
    table.innerHTML = temp
    var resultsContainer = document.getElementById('sresult');
    resultsContainer.innerHTML = ''; 
    temp = ''
    if (results.length > 0) {
        results.forEach(function(result) {
            temp+=`<tr>
            <td>${result.start_date}</td>
            <td>${result.total_payments}</td> 
      </tr>`
        });
    } 

    resultsContainer.innerHTML = temp;
}



function goBack() {
    switch (back) {
        case 1:
            main()
             break;
        case 2 :
            office();
            break;

        case 3 :
           office();
           break;
        case 4 :
            office();
            break;

        case 5 :
            showSearch();
            break;
        case 6 :
            showSearch();
            break;

        case 7 :
            showSearch();
            break;
        case 8 :
            customer();
        default:
            break;
    }
    
}