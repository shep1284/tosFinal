//Citation for the following file: add_product.js
//Date: 12/11/2023
//Adapted from: osu-cs340-ecampus/nodejs-starter-app
//Source Url: https://github.com/osu-cs340-ecampus/nodejs-starter-app
// Get the objects we need to modify
let addProductForm = document.getElementById('add-product-form-ajax');

// Modify the objects we need
addProductForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputName = document.getElementById("input-name");
    let inputDescription = document.getElementById("input-description");
    let inputUnitPrice = document.getElementById("input-unit-price");
    let inputQuantity = document.getElementById("input-quantity");
    let inputSupplier = document.getElementById("input-supplier");
    let inputCategory = document.getElementById("input-category");

    // Get the values from the form fields
    let nameValue = inputName.value;
    let descriptionValue = inputDescription.value;
    let unitPriceValue = inputUnitPrice.value;
    let quantityValue = inputQuantity.value;
    let supplierValue = inputSupplier.value;
    let categoryValue = inputCategory.value;

    // Put our data we want to send in a javascript object
    let data = {
        name: nameValue,
        description: descriptionValue,
        unitprice: unitPriceValue,
        quantity: quantityValue,
        supplier: supplierValue,
        category: categoryValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-product-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputName.value = '';
            inputDescription.value = '';
            inputUnitPrice.value = '';
            inputQuantity.value = '';
            inputSupplier.value = '';
            inputCategory.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("product-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let nameCell = document.createElement("TD");
    let descriptionCell = document.createElement("TD");
    let unitPriceCell = document.createElement("TD");
    let quantityCell = document.createElement("TD");
    let supplierCell = document.createElement("TD");
    let categoryCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.productID;
    nameCell.innerText = newRow.productName;
    descriptionCell.innerText = newRow.description;
    unitPriceCell.innerText = newRow.unitPrice;
    quantityCell.innerText = newRow.quantityInStock;
    supplierCell.innerText = newRow.supplierID;
    categoryCell.innerText = newRow.categoryID;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteProduct(newRow.productID);
    };
    
    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(descriptionCell);
    row.appendChild(unitPriceCell);
    row.appendChild(quantityCell);
    row.appendChild(supplierCell);
    row.appendChild(categoryCell);
    row.appendChild(deleteCell);

    // add a custom row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.productID);
    
    // Add the row to the table
    currentTable.appendChild(row);
    
    // Find drop down menu, create new option fill data in the option (full name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without need a refresh
    
    let selectMenu = document.getElementById("mySelect");
    let option = document.createElement("option");
    option.text = newRow.productName;
    option.value = newRow.productID;
    selectMenu.add(option);
}
