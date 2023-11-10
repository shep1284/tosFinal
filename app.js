const express = require('express');
const path = require('path');
const app = express();
const port = 4124;
 
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

// Database
var db = require('./database/db-connector');     

// Commented out for the time being as we get handlebars set up.
// Serve static files (e.g., HTML, CSS, JavaScript)
// app.use(express.static(path.join(__dirname, 'public')));
 
// Handle the root route
app.get('/', function(req, res)
    {
        let query1 = "SELECT * FROM Products"
        db.pool.query(query1, function(error, rows, fields){
          
          res.render('index', {data: rows});
        })
    });                                         

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
