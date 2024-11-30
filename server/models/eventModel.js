import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
    type: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String, required: true }
});

const addEventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    location_name: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    postal_code: { type: String },
    country: { type: String },
    latitude: { type: Number },
    longitude: { type: Number },
    max_capacity: { type: Number },
    registration_required: { type: Boolean },
    ticket_types: [ticketSchema],
    banner_image_url: { type: String },
    contact_email: { type: String },
    tags: [String],
    is_virtual: { type: Boolean },
    created_by: { type: String },
    imageUrl: { type: String }, // For locally uploaded images
    date: { type: Date, required: true }
});

// Use ES module export
export default mongoose.model("addEvent", addEventSchema);
