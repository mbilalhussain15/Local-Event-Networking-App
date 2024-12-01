import express from "express";

import { 
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent,
 } from "../controllers/eventController.js";

const router = express.Router();

router.post("/createEvent", createEvent);

// Get all events
router.get("/getEvents", getAllEvents);

// Get an event by ID
router.get("/getEventById/:id", getEventById);

// Update an event by ID
router.put("/updateEvent/:id", updateEvent);

// Delete an event by ID
router.delete("/deleteEvent/:id", deleteEvent);

export default router;
