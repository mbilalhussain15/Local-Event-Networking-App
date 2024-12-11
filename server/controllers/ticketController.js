import Ticket from '../models/ticketModel.js';
import Event from '../models/eventModel.js';

export const createTicket = async (req, res) => {
    try {
        const { ticketType, userId, eventId } = req.body;

        // Check if the event exists
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }

        // Check if the user has already purchased a ticket for this event
        const existingTicket = await Ticket.findOne({ userId, eventId });
        if (existingTicket) {
            return res.status(400).json({ error: "You have already purchased a ticket for this event" });
        }

        // Check if the event is fully booked
        if (event.totalTicketsSold >= event.maxCapacity) {
            return res.status(400).json({ error: "Event is fully booked" });
        }

        // Determine ticket price based on ticket type
        const price = ticketType === 'Standard' ? 50 : ticketType === 'VIP' ? 100 : 0;
        if (!price) {
            return res.status(400).json({ error: "Invalid ticket type" });
        }

        // Create the new ticket
        const ticket = new Ticket({ ticketType, price, userId, eventId });
        const savedTicket = await ticket.save();

        // Update the totalTicketsSold for the event
        event.totalTicketsSold += 1;
        await event.save();

        res.status(201).json({
            success: true,
            message: "Ticket created successfully",
            ticket: savedTicket,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const updateTicket = async (req, res) => {
    try {
        const { ticketType } = req.body;
        const ticketId = req.params.id;

        const price = ticketType === 'Standard' ? 50 : ticketType === 'VIP' ? 100 : 0;
        if (!price) {
            return res.status(400).json({ error: "Invalid ticket type" });
        }

        const updatedTicket = await Ticket.findByIdAndUpdate(
            ticketId,
            { ticketType, price },
            { new: true }
        );

        if (!updatedTicket) {
            return res.status(404).json({ error: "Ticket not found" });
        }

        res.status(200).json({
            success: true,
            message: "Ticket updated successfully",
            ticket: updatedTicket,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteTicket = async (req, res) => {
    try {
        const ticketId = req.params.id;
        console.log("Ticket ID to delete:", ticketId);  // Add this to check the ticket ID

        // Find the ticket by ID
        const ticket = await Ticket.findById(ticketId);
        console.log("Ticket fetched from DB:", ticket);  // Check if ticket is fetched

        if (!ticket) {
            return res.status(404).json({ error: "Ticket not found" });
        }

        // Find the associated event
        const event = await Event.findById(ticket.eventId);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }

        // Delete the ticket
        await Ticket.findByIdAndDelete(ticketId);

        // Decrease totalTicketsSold in the associated event
        event.totalTicketsSold -= 1;
        await event.save();

        res.status(200).json({
            success: true,
            message: "Ticket deleted successfully and event updated",
        });
    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).json({ error: error.message });
    }
};


export const getTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id).populate('eventId userId');
        if (!ticket) {
            return res.status(404).json({ error: "Ticket not found" });
        }
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find().populate('eventId userId');
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getTicketsByEventId = async (req, res) => {
    try {
        const tickets = await Ticket.find({ eventId: req.params.eventId });
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getTicketsByUserId = async (req, res) => {
    try {
        const tickets = await Ticket.find({ userId: req.params.userId });
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
