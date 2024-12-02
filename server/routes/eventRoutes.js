import express from 'express';
import {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    updateEventLocation,
} from '../controllers/eventController.js';

const router = express.Router();

// Create event
router.post('/createEvent', createEvent);

// Get all events
router.get('/getEvents', getAllEvents);

// Get event by ID
router.get('/getEventById/:id', getEventById);

// Update event
router.put('/updateEvent/:id', updateEvent);

// Delete event
router.delete('/deleteEvent/:id', deleteEvent);

// Update event location only
router.put('/updateEventLocation/:id', updateEventLocation);

export default router;
