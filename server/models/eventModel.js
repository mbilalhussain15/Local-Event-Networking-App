import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
    venueName: { type: String, required: true },
    streetAddress: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
});

const eventSchema = new mongoose.Schema({
    eventName: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    maxCapacity: { type: Number, required: true },
    totalTicketsSold: { type: Number, default: 0 },
    registration_required: { type: Boolean },
    contact_email: { type: String, required: true },
    is_virtual: { type: Boolean },
    created_by: { type: String, required: true },
    eventImage: { type: String }, // URL of the locally saved image
    date: { type: Date, required: true },
    location: { type: locationSchema, required: true }, // Location subdocument
});

export default mongoose.model('Event', eventSchema);
