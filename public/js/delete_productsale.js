//Citation for the following file: delet_productsale.js
//Date: 12/11/2023
//Adapted from: osu-cs340-ecampus/nodejs-starter-app
//Source Url: https://github.com/osu-cs340-ecampus/nodejs-starter-app
function deleteProductSale(productSaleID) {
    // put our data we want to send in a javascript object
    let data = {
        saleID: productSaleID,
    };


    // setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-productsale-ajax/", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // add the new data to the table
            deleteRow(productSaleID);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}

function deleteRow(productSaleID){

    let table = document.getElementById("productsales-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        // iterate through rows
        // rows would be accessed using the 'row' variable assigned in the for lo
        if (table.rows[i].getAttribute("data-value") == productSaleID) {
            table.deleteRow(i);
            deleteDropDownMenu(productSaleID);
            break;
        }
    }
}

function deleteDropDownMenu(productSaleID){
    let selectMenu = document.getElementById("saleID");
    for (let i = 0; i < selectMenu.clientHeight; i++){
        if (Number(selectMenu.options[i].value) === Number(productSaleID)){
            selectMenu[i].remove();
            break;
        }
    }
}
