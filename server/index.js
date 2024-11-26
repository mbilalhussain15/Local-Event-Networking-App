import dotenv from 'dotenv';
dotenv.config();  // Load environment variables from .env file

import express from 'express';  // Import express
import connectDB from './utils/mongoDB.js';  // Import MongoDB connection utility
import userRoutes from './routes/userRoutes.js';  // Import routes from userRoutes.js

const app = express();  // Initialize Express app

app.use(express.json());  // Parse JSON request bodies

connectDB();

app.use('/api/users', userRoutes);  // Use userRoutes for API requests

const PORT = process.env.PORT || 4000;  // Get the port from the .env file or default to 4000

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
