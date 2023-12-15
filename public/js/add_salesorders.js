//Citation for the following file: add_salesorders.js
//Date: 12/11/2023
//Adapted from: osu-cs340-ecampus/nodejs-starter-app
//Source Url: https://github.com/osu-cs340-ecampus/nodejs-starter-app
// Get the objects we need to modify
let addSalesOrderForm = document.getElementById('add-salesorders-form-ajax');

// Modify the objects we need
addSalesOrderForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputCustomerID = document.getElementById("input-customerID");
    let inputOrderDate = document.getElementById("input-orderDate");

    // Get the values from the form fields
    let customerIDValue = inputCustomerID.value;
    let orderDateValue = inputOrderDate.value;

    // Put our data we want to send in a JavaScript object
    let data = {
        customerID: customerIDValue,
        orderDate: orderDateValue,
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-salesorder-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
})

// Creates a single row from an Object representing a single record from SalesOrders
addRowToTable = (data) => {

    // Get a reference to the current table on the page
    let currentTable = document.getElementById("salesorders-table");

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 3 cells
    let row = document.createElement("TR");
    let orderIDCell = document.createElement("TD");
    let orderDateCell = document.createElement("TD");
    let customerIDCell = document.createElement("TD");

    // Fill the cells with correct data
    orderIDCell.innerText = newRow.orderID;
    orderDateCell.innerText = newRow.orderDate;
    customerIDCell.innerText = newRow.customerID;

    // Add the cells to the row 
    row.appendChild(orderIDCell);
    row.appendChild(orderDateCell);
    row.appendChild(customerIDCell);

    // Add the row to the table
    currentTable.querySelector('tbody').appendChild(row);
}
