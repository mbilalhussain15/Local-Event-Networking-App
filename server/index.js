import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';  
import helmet from 'helmet';  
import morgan from 'morgan'; 
import connectDB from './utils/mongoDB.js';
import userRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';

dotenv.config(); 

const app = express(); 

app.use(express.json()); 
app.use(cors()); 
app.use(helmet()); 
app.use(morgan('dev')); 

app.use(cookieParser()); 
connectDB();
app.use('/api', userRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
