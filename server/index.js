import express from 'express';
const app = express();

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Set the server to listen on port 3000
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
