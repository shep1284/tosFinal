const express = require('express');
const path = require('path');
const app = express();
const port = 4124;

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

 
// Serve static files (e.g., HTML, CSS, JavaScript)
//app.use(express.static(path.join(__dirname, 'public')));
// Commented out while getting handlebars working

// Handle the root route
app.get('/', function(req, res)
    {
        res.render('index');                    // Note the call to render() and not send(). Using render() ensures the templating engine
    });                                         // will process this file, before sending the finished HTML to the client.


 
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});