function deleteProduct(productID) {
    // put our data we want to send in a javascript object
    let data = {
        id: productID
    };

    // setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-product-ajax/", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // add the new data to the table
            deleteRow(productID);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}

function deleteRow(productID){

    let table = document.getElementById("product-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        // iterate through rows
        // rows would be accessed using the 'row' variable assigned in the for lo
        if (table.rows[i].getAttribute("data-value") == productID) {
            table.deleteRow(i);
            deleteDropDownMenu(productID);
            break;
        }
    }
}

function deleteDropDownMenu(productID){
    let selectMenu = document.getElementById("mySelect");
    for (let i = 0; i < selectMenu.clientHeight; i++){
        if (Number(selectMenu.options[i].value) === Number(productID)){
            selectMenu[i].remove();
            break;
        }
    }
}
