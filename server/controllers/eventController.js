import Event from '../models/eventModel.js';

export const createEvent = async (req, res) => {
    try {
        const {
            eventName,
            description,
            category,
            max_capacity,
            registration_required,
            contact_email,
            is_virtual,
            created_by,
            date,
        } = req.body;

        const newEvent = new Event({
            eventName,
            description,
            category,
            maxCapacity: max_capacity,
            registrationRequired: registration_required,
            contactEmail: contact_email,
            isVirtual: is_virtual,
            createdBy: created_by,
            date,
            totalTicketsSold: 0, // Initialize tickets sold to 0
        });

        const savedEvent = await newEvent.save();
        res.status(201).json({
            success: true,
            message: "Event created successfully",
            event: savedEvent,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateEvent = async (req, res) => {
    try {
        const {
            eventName,
            description,
            category,
            max_capacity,
            registration_required,
            contact_email,
            is_virtual,
            created_by,
            date,
        } = req.body;

        const updatedData = {
            eventName,
            description,
            category,
            maxCapacity: max_capacity,
            registrationRequired: registration_required,
            contactEmail: contact_email,
            isVirtual: is_virtual,
            createdBy: created_by,
            date,
        };

        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true }
        );

        if (!updatedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.status(200).json({
            success: true,
            message: "Event updated successfully",
            event: updatedEvent,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
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
