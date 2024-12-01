import express from 'express';
import { getPaymentByTransactionId, getPaymentByUserId, initiatePayment, simulatePayment } from '../controllers/paymentController.js';

const router = express.Router();

// Initiate Payment (generate payment request)
router.post('/initiatePayment', initiatePayment);

// Simulate Payment (payment processing and saving to DB)
router.post('/simulatePayment', simulatePayment);

router.get('/getPaymentByUserId/:userId', getPaymentByUserId);

// Define the route to get payment by transactionId
router.get('/getPaymentByTransactionId/:transactionId', getPaymentByTransactionId);

export default router;
