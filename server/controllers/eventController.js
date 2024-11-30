import Event from "../models/eventModel.js";  // Correct ES module import


export const createEvent = async (req, res) => {
    try {
        const {
            name,
            description,
            category,
            location_name,
            address,
            city,
            state,
            postal_code,
            country,
            latitude,
            longitude,
            max_capacity,
            registration_required,
            ticket_types,
            banner_image_url,
            contact_email,
            tags,
            is_virtual,
            created_by,
            date,
            userId,  // Ensure userId is passed in the request body
        } = req.body;

        // Generate image URL based on the file upload path
        const imageUrl = req.file ? `/uploads/users/${userId}/events/${req.params.eventId}/${req.file.filename}` : null;

        const eventSave = new Event ({
            name,
            description,
            category,
            location_name,
            address,
            city,
            state,
            postal_code,
            country,
            latitude,
            longitude,
            max_capacity,
            registration_required,
            ticket_types: JSON.parse(ticket_types), // Parse ticket types if sent as JSON string
            banner_image_url,
            contact_email,
            tags: tags ? JSON.parse(tags) : [], // Parse tags if sent as JSON string
            is_virtual,
            created_by,
            imageUrl,  // Store the local image URL in DB
            date
        });

        await eventSave.save();
        res.status(201).json(eventSave);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateEvent = async (req, res) => {
    try {
        const {
            name,
            description,
            category,
            location_name,
            address,
            city,
            state,
            postal_code,
            country,
            latitude,
            longitude,
            max_capacity,
            registration_required,
            ticket_types,
            banner_image_url,
            contact_email,
            tags,
            is_virtual,
            created_by,
            date
        } = req.body;

        const userId = req.body.userId || req.params.userId;
        const eventId = req.params.eventId;

        // Generate new image URL if a new image is uploaded
        const imageUrl = req.file ? `/uploads/users/${userId}/events/${eventId}/${req.file.filename}` : undefined;

        const updatedData = {
            name,
            description,
            category,
            location_name,
            address,
            city,
            state,
            postal_code,
            country,
            latitude,
            longitude,
            max_capacity,
            registration_required,
            ticket_types: ticket_types ? JSON.parse(ticket_types) : undefined,
            banner_image_url,
            contact_email,
            tags: tags ? JSON.parse(tags) : undefined,
            is_virtual,
            created_by,
            imageUrl,
            date
        };

        // Remove undefined fields to avoid overwriting
        Object.keys(updatedData).forEach((key) => {
            if (updatedData[key] === undefined) {
                delete updatedData[key];
            }
        });

        const event = await Event.findByIdAndUpdate(req.params.id, updatedData, { new: true });

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllEvents = async (req, res) => {
    try {
        console.log("eventGet");
        
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
