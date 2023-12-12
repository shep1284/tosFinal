let updateProductSalesForm = document.getElementById('update-productsales-form-ajax');

updateProductSalesForm.addEventListener("submit", function (e) {

    e.preventDefault();

    let inputSaleID = document.getElementById("saleID");
    let inputQuantity = document.getElementById("input-quantity-update");
    let inputSalePrice = document.getElementById("input-saleprice-update");

    let saleIDvalue = parseInt(inputSaleID.value);
    let quantityValue = inputQuantity.value;
    let salePriceValue = inputSalePrice.value;
    
    
    if (isNaN(quantityValue))
    {
        return;
    }
    
    if (isNaN(salePriceValue))
    {
        return;
    }
    
    

    let data = {
        sale: saleIDvalue,
        quantity: quantityValue,
        salePrice: salePriceValue,
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-productsale-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            updateRow(data, saleIDvalue);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }
    xhttp.send(JSON.stringify(data));

})

function updateRow(data, saleID){
    let table = document.getElementById("productsales-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        
        if (table.rows[i].getAttribute("data-value") == saleID) {
            
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            let quantityTd = updateRowIndex.getElementsByTagName("td")[3];
            let salePriceTd = updateRowIndex.getElementsByTagName("td")[4];

            quantityTd.innerHTML = data.quantity;
            salePriceTd.innerHTML = data.salePrice;
        }
    }
}