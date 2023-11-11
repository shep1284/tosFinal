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
//app.use(express.static(path.join(__dirname, 'public')));
// Commented out while getting handlebars working

// Handle the root route
app.get('/', function(req, res)
    {  
        let query1 = "SELECT * FROM Products;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('index', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query 


 
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});