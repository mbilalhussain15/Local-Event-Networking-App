import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
    name: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    postal_code: { type: String },
    country: { type: String },
    latitude: { type: Number },
    longitude: { type: Number }
});

const eventSchema = new mongoose.Schema({
    eventName: { type: String },
    description: { type: String },
    category: { type: String },
    maxCapacity: { type: Number, required: true },
    totalTicketsSold: { type: Number, default: 0 },
    registration_required: { type: Boolean },
    contact_email: { type: String },
    is_virtual: { type: Boolean },
    created_by: { type: String },
    eventImage: { type: String }, // URL of the locally saved image
    date: { type: Date }
});

// Use a singular model name here, which will be automatically pluralized to 'events'
export default mongoose.model('Event', eventSchema);

