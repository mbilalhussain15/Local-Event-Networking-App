import express from 'express';
import { sendNotification } from '../controllers/notificationController.js';

const router = express.Router();

// Route to send notifications
router.post('/send-notification', sendNotification);

export default router;
