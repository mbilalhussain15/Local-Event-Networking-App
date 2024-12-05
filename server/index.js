import http from 'http';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import connectDB from './utils/mongoDB.js';
import { initializeSocket } from './controllers/notificationController.js';  // Import the socket initializer
import routes from './routes/index.js';

dotenv.config();

const app = express();
const server = http.createServer(app);  // Create an HTTP server

// Initialize socket configuration
initializeSocket(server);

// Middleware setup
app.use(express.json());
//app.use(cors());
app.use(cors({
  origin: '*', // Allow all origins (change to specific domain in production)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token']
}));
app.use(helmet());
app.use(morgan('dev'));
app.use(cookieParser());

// Database connection
connectDB();

// API routes
app.use("/api", routes);

// Start the server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
