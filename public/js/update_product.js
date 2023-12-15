//Citation for the following file: update_product.js
//Date: 12/11/2023
//Adapted from: osu-cs340-ecampus/nodejs-starter-app
//Source Url: https://github.com/osu-cs340-ecampus/nodejs-starter-app
// Get the objects we need to modify
let updateProductForm = document.getElementById('update-product-form-ajax');

// modify the objects we need
updateProductForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputProductName = document.getElementById("mySelect");
    let inputDescription = document.getElementById("input-description-update");
    let inputSupplier = document.getElementById("input-supplier-update");
    let inputCategory = document.getElementById("input-category-update");

    // Get the values from the form fields
    let productNameValue = parseInt(inputProductName.value);
    let descriptionValue = inputDescription.value;
    let supplierValue = parseInt(inputSupplier.value);
    let categoryValue = parseInt(inputCategory.value);

    // NULL handling
    if (isNaN(supplierValue))
    {
        return;
    }
    if (isNaN(productNameValue))
    {
        return;
    }
    if (isNaN(categoryValue))
    {
        categoryValue = null;
    }

    // Put our data we want to send in a javascript object
    let data = {
        product: productNameValue,
        supplier: supplierValue,
        description: descriptionValue,
        category: categoryValue,
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-product-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

  

            // Add the new data to the table
            updateRow(data, productNameValue);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})

function updateRow(data, productID){

    let table = document.getElementById("product-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        
        if (table.rows[i].getAttribute("data-value") == productID) {

            // Get the location of the row where we found the matching productID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get the td of the value to be updated
            let descriptionTd = updateRowIndex.getElementsByTagName("td")[2];
            let supplierTd = updateRowIndex.getElementsByTagName("td")[5];
            let categoryTd = updateRowIndex.getElementsByTagName("td")[6];

            // Reassign to updated value
            supplierTd.innerHTML = data.supplier;
            descriptionTd.innerHTML = data.description;
            categoryTd.innerHTML = data.category;

        }
    }
}