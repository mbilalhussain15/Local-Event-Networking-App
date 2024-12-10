import Event from '../models/eventModel.js';

// Create event with location details
export const createEvent = async (req, res) => {
    try {
        const {
            eventName,
            description,
            category,
            maxCapacity,
            registration_required,
            is_virtual,
            user_id, // Changed from created_by to user_id
            date,
            location, // Accept location object
        } = req.body;

        // Validate location (latitude and longitude are no longer needed)
        if (!location || !location.venueName || !location.streetAddress || !location.city || !location.state || !location.postalCode || !location.country) {
            return res.status(400).json({
                success: false,
                message: "Location details are required and must include venueName, streetAddress, city, state, postalCode, and country.",
            });
        }

        const newEvent = new Event({
            eventName,
            description,
            category,
            maxCapacity,
            registration_required,
            is_virtual,
            user_id, // Changed from created_by to user_id
            date,
            location, // Save location details
            createdAt: Date.now(), // Adding createdAt attribute
        });

        const savedEvent = await newEvent.save();
        res.status(201).json({
            success: true,
            message: "Event created successfully",
            event: savedEvent,
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};



// Update event (location can be updated here too)
export const updateEvent = async (req, res) => {
    try {
        const updatedData = req.body; // Accept all updates, including location
        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true } // Return the updated document
        );

        if (!updatedEvent) {
            return res.status(404).json({ success: false, message: "Event not found" });
        }

        res.status(200).json({
            success: true,
            message: "Event updated successfully",
            event: updatedEvent,
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};



export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// In controllers/eventController.js

export const updateEventLocation = async (req, res) => {
    try {
        const { venueName, streetAddress, city, state, postalCode, country, latitude, longitude } = req.body;

        // Validate location data
        if (!venueName || !streetAddress || !city || !postalCode || !country || !latitude || !longitude) {
            return res.status(400).json({
                success: false,
                message: "All location fields are required (venueName, streetAddress, city, postalCode, country, latitude, longitude).",
            });
        }

        // Find the event by ID and update the location
        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            { location: { venueName, streetAddress, city, state, postalCode, country, latitude, longitude } },
            { new: true } // Return the updated document
        );

        if (!updatedEvent) {
            return res.status(404).json({ success: false, message: "Event not found" });
        }

        res.status(200).json({
            success: true,
            message: "Event location updated successfully",
            event: updatedEvent,
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
