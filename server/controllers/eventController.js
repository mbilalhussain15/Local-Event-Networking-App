import Event from "../models/eventModel.js";  // Correct ES module import

export const createEvent = async (req, res) => {
    try {
        // Destructure the incoming data from the request body
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

        const userId = "1234"; // Ideally, fetch dynamically

        // Create event document
        const eventSave = new Event({
            eventName,
            description,
            category,
            max_capacity,
            registration_required,
            contact_email,
            is_virtual,
            created_by,
            date
        });

        // Save event to DB
        const savedEvent = await eventSave.save();

        // Prepare the response with success message and the full event details
        res.status(201).json({
            success: true,
            message: "Event created successfully",
            event: savedEvent
        });

    } catch (error) {
        // Handle errors
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};


export const updateEvent = async (req, res) => {
    try {
        // Destructure the incoming data from the request body
        const {
            eventName,
            description,
            category,
            max_capacity,
            registration_required,
            contact_email,
            is_virtual,
            created_by,
            date
        } = req.body;
        
        const userId = "1234"; // Ideally, fetch dynamically

        // Generate the event image URL if an image file is uploaded
        const eventImage = req.file
            ? `http://localhost:4000/uploads/${userId}/events/${req.params.id}/${req.file.filename}`
            : null;

        // Prepare the updated event data
        const updatedData = {
            eventName,
            description,
            category,
            max_capacity,
            registration_required,
            contact_email,
            is_virtual,
            created_by,
            eventImage,
            date
        };

        // Remove any fields that are undefined or not provided
        Object.keys(updatedData).forEach((key) => {
            if (updatedData[key] === undefined) {
                delete updatedData[key];
            }
        });

        // Find the event by its ID and update the fields
        const event = await Event.findByIdAndUpdate(req.params.id, updatedData, { new: true });

        // If the event is not found, return a 404 error
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        // Return the updated event data in the response
        res.status(200).json({
            success: true,
            message: "Event updated successfully",
            event: event
        });

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
