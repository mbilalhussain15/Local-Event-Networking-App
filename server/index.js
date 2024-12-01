import express from 'express';  
import dotenv from 'dotenv';  
import cors from 'cors';  
import helmet from 'helmet';  
import morgan from 'morgan';  
import connectDB from './utils/mongoDB.js';  
import userRoutes from './routes/userRoutes.js';  
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';

dotenv.config();  // Load environment variables

const app = express();  

// Middleware setup
app.use(express.json());  
app.use(cors());  
app.use(helmet());  
app.use(morgan('dev'));  
app.use(cookieParser());

// Database connection
connectDB();

// API routes
app.use('/api/users', userRoutes);  
app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
