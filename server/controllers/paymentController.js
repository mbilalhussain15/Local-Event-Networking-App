import Ticket from '../models/ticketModel.js';
import Event from '../models/eventModel.js';
import Payment from '../models/paymentModel.js'; // This model stores payment info

export const initiatePayment = async (req, res) => {
    try {
        const { userId, ticketId, paymentMethod } = req.body;

        // Get ticket details
        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        // Get event details
        const event = await Event.findById(ticket.eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        // Calculate amount based on ticket price (Assume ticket price is already set in ticket model)
        const amount = ticket.price;

        // Return payment details (this is a simulation for testing purposes)
        res.status(200).json({
            success: true,
            message: 'Payment initiated successfully',
            paymentDetails: {
                amount,
                paymentMethod,  // Could be 'stripe' or 'paypal'
                ticketId,
                eventId: event._id,
                userId,
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const simulatePayment = async (req, res) => {
    try {
        const { paymentDetails } = req.body;

        // Simulate a fake transaction (for testing)
        const transactionId = 'txn_' + Math.random().toString(36).substring(2, 15); // Fake transaction ID
        const paymentStatus = Math.random() < 0.8 ? 'success' : 'failed'; // Simulate a 80% chance of success

        // Save payment details to the database
        const payment = new Payment({
            transactionId,
            paymentStatus,
            userId: paymentDetails.userId,
            ticketId: paymentDetails.ticketId,
            eventId: paymentDetails.eventId,
            amount: paymentDetails.amount,
            paymentMethod: paymentDetails.paymentMethod,
        });
        await payment.save();

        // Respond with payment status
        res.status(200).json({
            success: true,
            message: `Payment ${paymentStatus} for ticket ${paymentDetails.ticketId}`,
            transactionId,
            paymentStatus
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};





export const getPaymentByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        // Find payments by userId
        const payments = await Payment.find({ userId }).populate('ticketId eventId');

        if (payments.length === 0) {
            return res.status(404).json({ error: 'No payments found for this user' });
        }

        res.status(200).json({ success: true, payments });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getPaymentByTransactionId = async (req, res) => {
    try {
        const { transactionId } = req.params;

        // Find the payment by transactionId
        const payment = await Payment.findOne({ transactionId }).populate('ticketId eventId');

        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }

        res.status(200).json({ success: true, payment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
