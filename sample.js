const express = require('express');
const app = express();
const port = 3000;

// Define a route handler for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to this Space');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
