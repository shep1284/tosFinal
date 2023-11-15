const express = require('express');
const path = require('path');
const app = express();
const port = 4124;


// Enable express to handle JSON and form data
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public/views'))

// Database
var db = require('./database/db-connector');

const { engine } = require('express-handlebars');  // Import express-handlebars
const { findByScript } = require('forever');
const exp = require('constants');
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
        let query1 = "SELECT * FROM Products;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('products', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we received back from the query 
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
        let query1 = "SELECT * FROM Suppliers;";               

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
app.post('/add-product-form', function(req, res){
    
    // capture the incoming data and parse it back to a JS object
    let data = req.body;

    // capture NULL values
    let name = parseInt(data['input-name']);
    if (isNaN(name))
    {
        name = 'NULL'
    }

    let description = parseInt(data['input-description']);
    if (isNaN(description))
    {
        description = 'NULL'
    }

    let unitPrice = parseInt(data['input-price']);
    if (isNaN(unitPrice))
    {
        unitPrice = 'NULL'
    }

    let quantityInStock = parseInt(data['input-quantity']);
    if (isNaN(quantityInStock))
    {
        quantityInStock = 'NULL'
    }

    let supplier = parseInt(data['input-supplier']);
    if (isNaN(supplier))
    {
        supplier = 'NULL'
    }

    let category = parseInt(data['input-category']);
    if (isNaN(category))
    {
        category = 'NULL'
    }

    // create the query and run it on that database
    query1 = `INSERT INTO Products (productName, description, unitPrice, quantityInStock, supplierID, categoryID) VALUES ('${data['input-name']}', '${data['input-description']}', '${data['input-price']}', '${data['input-quantity']}', '${data['input-supplier']}', '${data['input-category']}')`;
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
            res.redirect('/products');
        }
    })
})



 
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});