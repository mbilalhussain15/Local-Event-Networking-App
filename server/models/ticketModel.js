import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
    ticketType: { type: String, enum: ['Normal', 'VIP'], required: true },
    price: { type: Number, required: true },
    currency: { type: String, default: 'EUR' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true }
});

export default mongoose.model('Ticket', ticketSchema);
