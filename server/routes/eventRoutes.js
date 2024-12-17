import express from 'express';
import {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    updateEventLocation,
    updateEventWithImage,
} from '../controllers/eventController.js';
import { uploadEvent } from '../middleware/uploadEventImage.js';

const router = express.Router();

// Create event
router.post('/createEvent', createEvent);

// Image upload route (separate from event creation)
router.post('/uploadEventImage/:userId/:eventId', uploadEvent.single('eventImage'), updateEventWithImage);

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
