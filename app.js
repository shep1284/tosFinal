const express = require('express');
const path = require('path');
const app = express();
const port = 4124;


// Enable express to handle JSON and form data
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// app.use(express.static('public/views'))
app.use(express.static('public'))

// Database
var db = require('./database/db-connector');

const { engine } = require('express-handlebars');  // Import express-handlebars
const { findByScript } = require('forever');
const exp = require('constants');
const { SourceTextModule } = require('vm');
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.
 
// Serve static files (e.g., HTML, CSS, JavaScript)
// app.use(express.static(path.join(__dirname, 'public')));
// Commented out while getting handlebars working

// Routing
app.get('/', function(req, res)
    {  
        res.render('index');                  // Render the index.hbs file, and also send the renderer                                                     // an object where 'data' is equal to the 'rows' we
    });     
                                                        
app.get('/products', function(req, res)
    {  
        let query1;
        
        // if there is no query/search string
        if (req.query.name === undefined)
        {
            query1 = "SELECT * FROM Products"
        }
        
        // is there is a query/search string
        else
        {
            query1 = `SELECT * FROM Products WHERE productName LIKE "${req.query.name}";`;
        }

        let query2 = "SELECT * FROM Suppliers;";
        let query3 = "SELECT * FROM ProductCategories;";

        db.pool.query(query1, function(error, rows, fields){    // Execute the first query
            // save the products
            let products = rows;

            db.pool.query(query2, (error, rows, fields) => {
                let suppliers = rows;

                    db.pool.query(query3, (error, rows, fields) => {
                        let categories = rows;
                        return res.render('products', {data: products, suppliers: suppliers, categories: categories});         
                })
            })
        })    
    });     
                                                        
app.get('/categories', function(req, res)
    {  
        let query1 = "SELECT * FROM ProductCategories;";

        db.pool.query(query1, function(error, rows, fields){

            res.render('categories', {data: rows});
        })                                                      
    });            
                                                 
app.get('/suppliers', function(req, res)
    {  
        let query1;

        // if there is no search string
        if (req.query.name === undefined)
        {

            query1 = "SELECT * FROM Suppliers"               
        }

        // if there is a search string
        else
        {

            query1 = `SELECT * FROM Suppliers WHERE supplierName LIKE "${req.query.name}";`;               
        }

        db.pool.query(query1, function(error, rows, fields){    

            res.render('suppliers', {data: rows});                 
        })                                                     
    });          
                                                 
app.get('/customers', function(req, res)
    {  
        let query1 = "SELECT * FROM Customers;";            

        db.pool.query(query1, function(error, rows, fields){  

            res.render('customers', {data: rows});  
        })                       
    });       
                                
app.get('/salesorders', function(req, res)
    {  
        let query1 = "SELECT * FROM SalesOrders;";        

        db.pool.query(query1, function(error, rows, fields){  

            res.render('salesorders', {data: rows});      
        })                                                
    });                                                    

app.get('/productsales', function(req, res)
    {  
        let query1 = "SELECT * FROM ProductSales;";              

        db.pool.query(query1, function(error, rows, fields){    

            res.render('productsales', {data: rows});                  
        })                                                      
    });                                                         

// form routing
app.post('/add-product-ajax', function(req, res){
    
    // capture the incoming data and parse it back to a JS object
    let data = req.body;

    // capture NULL values
    let name = parseInt(data['name']);
    if (isNaN(name))
    {
        name = 'NULL'
    }

    let description = parseInt(data['description']);
    if (isNaN(description))
    {
        description = 'NULL'
    }

    let unitPrice = parseInt(data['unitprice']);
    if (isNaN(unitPrice))
    {
        unitPrice = 'NULL'
    }

    let quantityInStock = parseInt(data['quantity']);
    if (isNaN(quantityInStock))
    {
        quantityInStock = 'NULL'
    }

    let supplier = parseInt(data['supplier']);
    if (isNaN(supplier))
    {
        supplier = 'NULL'
    }

    let category = parseInt(data['category']);
    if (isNaN(category))
    {
        category = 'NULL'
    }

    // create the query and run it on that database
    query1 = `INSERT INTO Products (productName, description, unitPrice, quantityInStock, supplierID, categoryID) VALUES ('${data['name']}', '${data['description']}', '${data['unitprice']}', '${data['quantity']}', '${data['supplier']}', '${data['category']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // check to see if there was an error
        if (error) {

            // log the error to the terminal so we know what went wrong,
            // and send the visitor and HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // if there was no error, we redirect back to Products route,
        // which automatically runs the SELECT * FROM Products and presents it on the screen.
        else
        {
            // If there was no error, perform a SELECT * on Products
            query2 = `SELECT * FROM Products`;
            db.pool.query(query2, function(error, rows, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else{
                    res.send(rows);
                }
            })
        }
    })
})

app.put('/put-product-ajax', function(req,res,next){
    let data = req.body;

    let supplier = parseInt(data.supplier);
    let product = parseInt(data.product);

    let queryUpdateSupplier = `UPDATE Products SET supplierID = ? WHERE Products.productID = ?`;
    let selectSupplier = `SELECT * FROM Products WHERE productID = ?`;

        // Run the 1st query
        db.pool.query(queryUpdateSupplier, [supplier, product], function(error, rows, fields){
            if (error) {
                console.log(error);
                res.sendStatus(400);
            }
            else
            {
                db.pool.query(selectSupplier, [supplier], function(error, rows, fields) {

                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.send(rows);
                    }
                })
            }
        })
})



app.post('/add-category-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    
    // Capture NULL values
    let categoryName = data['input-category'] ? `'${data['input-category']}'` : 'NULL';
    
    // Create the query and run it on the database
    let query = `INSERT INTO ProductCategories (category) VALUES (${categoryName})`;
    
    db.pool.query(query, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong,
            // and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        } else {
            // If there was no error, redirect back to the root route or any desired route.
            res.redirect('/categories');
        }
    });
});


app.post('/add-productsale-ajax', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let productID = parseInt(data['input-productID']);
    if (isNaN(productID)) {
        productID = 'NULL';
    }

    let orderID = parseInt(data['input-orderID']);
    if (isNaN(orderID)) {
        orderID = 'NULL';
    }

    let quantitySold = parseInt(data['input-quantitySold']);
    if (isNaN(quantitySold)) {
        quantitySold = 'NULL';
    }

    let salePrice = parseFloat(data['input-salePrice']);
    if (isNaN(salePrice)) {
        salePrice = 'NULL';
    }

    // Create the query and run it on the database
    const query1 = `INSERT INTO ProductSales (productID, orderID, quantitySold, salePrice) VALUES (${productID}, ${orderID}, ${quantitySold}, ${salePrice})`;

    db.pool.query(query1, function(error, rows, fields) {
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        } else {
            // If there was no error, perform a SELECT * on productsales
            const query2 = `SELECT * FROM ProductSales;`;
            db.pool.query(query2, function(error, rows, fields) {
                // If there was an error on the second query, send a 400
                if (error) {
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            });
        }
    });
});

// Delete routing
app.delete('/delete-product-ajax/', function(req,res,next){
    let data = req.body;
    let productID = parseInt(data.id);
    let deleteProductSales = `DELETE FROM ProductSales WHERE productID = ?`;
    let deleteProduct = `DELETE FROM Products WHERE productID = ?`;

        // run the 1st query
        db.pool.query(deleteProductSales, [productID], function(error, rows, fields){
            if (error) {

                // log the error to the terminal and send the visitor a HTTP response 400.
                console.log(error);
                res.sendStatus(400);
                }

                else
                {
                    // run the second query
                    db.pool.query(deleteProduct, [productID], function(error, rows, fields) {

                        if (error) {
                            console.log(error);
                            res.sendStatus(400);
                        } else {
                            res.sendStatus(204);
                        }
                    })
                }
        })});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
