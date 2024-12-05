import express from "express";
import userRoutes from "./userRoutes.js";
import eventRoutes from './eventRoutes.js'
import ticketRoutes from './ticketRoutes.js';
import paymentRoutes from './paymentRoutes.js';
import notificationRoutes from './notificationRoutes.js';

const router = express.Router();

router.use('/users', userRoutes);  // User management routes
router.use('/notifications', notificationRoutes);  // Notification routes
router.use("/event",eventRoutes); //api/event
router.use("/tickets",ticketRoutes); //api/ticket
router.use("/payments",paymentRoutes); //api/payment



export default router;