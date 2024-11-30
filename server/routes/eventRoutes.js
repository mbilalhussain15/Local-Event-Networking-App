import express from "express";

import upload from "../middleware/uploadEventFilesMiddleware.js";  // Import the updated upload middleware
import { 
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent

 } from "../controllers/eventController.js";

const router = express.Router();

// Define routes
router.post("/createEvent", upload.single("image"), createEvent);  // POST route to create event with image upload

// Get all events
router.get("/getEvents", getAllEvents);

// Get an event by ID
router.get("/getEventById/:id", getEventById);

// Update an event by ID
router.put("/updateEvent/:id", upload.single("image"), updateEvent);

// Delete an event by ID
router.delete("/deleteEvent/:id", deleteEvent);

export default router;
