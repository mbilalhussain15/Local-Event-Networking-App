import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    transactionId: { type: String, required: true },  // Fake transaction ID
    paymentStatus: { type: String, required: true },  // 'success' or 'failed'
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    ticketId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, required: true },  // 'stripe', 'paypal'
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Payment', paymentSchema);
