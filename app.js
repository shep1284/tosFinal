const express = require('express');
const path = require('path');
const app = express();
const port = 4124;


// Database
var db = require('./database/db-connector');

const { engine } = require('express-handlebars');  // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

 
// Serve static files (e.g., HTML, CSS, JavaScript)
// app.use(express.static(path.join(__dirname, 'public')));
// Commented out while getting handlebars working

// Handle the root route
app.get('/', function(req, res)
    {  

        res.render('index');                  // Render the index.hbs file, and also send the renderer                                                     // an object where 'data' is equal to the 'rows' we
    });     
                                                        // received back from the query 
app.get('/products', function(req, res)
    {  
        let query1 = "SELECT * FROM Products;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('products', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });     
                                                        // received back from the query 
app.get('/categories', function(req, res)
    {  
        let query1 = "SELECT * FROM ProductCategories;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('categories', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });            
                                                 // received back from the query 
app.get('/suppliers', function(req, res)
    {  
        let query1 = "SELECT * FROM Suppliers;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('suppliers', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });          
                                                   // received back from the query 
app.get('/customers', function(req, res)
    {  
        let query1 = "SELECT * FROM Customers;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('customers', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });       
                                                      // received back from the query 
app.get('/salesorders', function(req, res)
    {  
        let query1 = "SELECT * FROM SalesOrders;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('salesorders', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query 

app.get('/productsales', function(req, res)
    {  
        let query1 = "SELECT * FROM ProductSales;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('productsales', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query 



 
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});