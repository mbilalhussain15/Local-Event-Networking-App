import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
    venueName: { type: String, required: true },
    streetAddress: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
});

const eventSchema = new mongoose.Schema({
    eventName: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    maxCapacity: { type: Number, required: true },
    totalTicketsSold: { type: Number, default: 0 },
    is_virtual: { type: Boolean },
    user_id: { type: String, required: true }, // Changed from created_by to user_id
    eventImage: { type: String }, // URL of the locally saved image
    date: { type: Date, required: true },
    location: { type: locationSchema, required: true }, // Location subdocument
    createdAt: { type: Date, default: Date.now }, // Added createdAt attribute
});

export default mongoose.model('Event', eventSchema);
