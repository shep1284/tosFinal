// Get the objects we need to modify
let updateProductForm = document.getElementById('update-product-form-ajax');

// modify the objects we need
updateProductForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputProductName = document.getElementById("mySelect");
    let inputSupplier = document.getElementById("input-supplier-update");
    // console.log(inputSupplier);
    let inputDescription = document.getElementById("input-description-update");

    // Get the values from the form fields
    let productNameValue = parseInt(inputProductName.value);
    let supplierValue = parseInt(inputSupplier.value);
    let descriptionValue = inputDescription.value;

    // Does not allow value to be updated to NULL
    //console.log(supplierValue);
    if (isNaN(supplierValue))
    {
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        product: productNameValue,
        supplier: supplierValue,
        description: descriptionValue,
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

            // Get the td of the supplier value
            let supplierTd = updateRowIndex.getElementsByTagName("td")[5];
            let descriptionTd = updateRowIndex.getElementsByTagName("td")[2];

            // Reassign supplier to our value we updated to
            supplierTd.innerHTML = data.supplier;
            descriptionTd.innerHTML = data.description;


        }
    }
}