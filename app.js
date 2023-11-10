const express = require('express');
const path = require('path');
const app = express();
const port = 4124;
 
// Serve static files (e.g., HTML, CSS, JavaScript)
app.use(express.static(path.join(__dirname, 'public')));
 
// Handle the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});
 
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});