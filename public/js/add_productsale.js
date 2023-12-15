//Citation for the following file: add_productsale.js
//Date: 12/11/2023
//Adapted from: osu-cs340-ecampus/nodejs-starter-app
//Source Url: https://github.com/osu-cs340-ecampus/nodejs-starter-app
// Get the objects we need to modify
let addProductSaleForm = document.getElementById('add-productsales-form-ajax');

// Modify the objects we need
addProductSaleForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputProductID = document.getElementById("input-productID");
    let inputOrderID = document.getElementById("input-orderID");
    let inputQuantitySold = document.getElementById("input-quantitySold");
    let inputSalePrice = document.getElementById("input-salePrice");

    // Get the values from the form fields
    let productIDValue = inputProductID.value;
    let orderIDValue = inputOrderID.value;
    let quantitySoldValue = inputQuantitySold.value;
    let salePriceValue = inputSalePrice.value;

    // Put our data we want to send in a JavaScript object
    let data = {
        product: productIDValue,
        order: orderIDValue,
        quantitySold: quantitySoldValue,
        salePrice: salePriceValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-productsale-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputProductID.value = '';
            inputOrderID.value = '';
            inputQuantitySold.value = '';
            inputSalePrice.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
})

// Creates a single row from an Object representing a single record from productsales
addRowToTable = (data) => {
    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("productsales-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1];

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let productIDCell = document.createElement("TD");
    let orderIDCell = document.createElement("TD");
    let quantitySoldCell = document.createElement("TD");
    let salePriceCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.productSaleID;
    productIDCell.innerText = newRow.productID;
    orderIDCell.innerText = newRow.orderID;
    quantitySoldCell.innerText = newRow.quantitySold;
    salePriceCell.innerText = newRow.salePrice;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteProductSale(newRow.productSaleID);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(productIDCell);
    row.appendChild(orderIDCell);
    row.appendChild(quantitySoldCell);
    row.appendChild(salePriceCell);
    row.appendChild(deleteCell);


    // add a custom row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.productID);
    
    // Add the row to the table
    currentTable.appendChild(row);
    
}
