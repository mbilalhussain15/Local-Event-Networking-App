import dotenv from 'dotenv';
dotenv.config();  // This will load the .env file


import connectDB from './utils/mongoDB.js';

const PORT = process.env.PORT || 4000;  // Use the value from the .env file or default to 4000

// Connect to MongoDB
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
