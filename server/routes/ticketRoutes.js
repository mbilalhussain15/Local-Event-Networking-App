import express from 'express';
import { createTicket, deleteTicket, getAllTickets, getTicketById, getTicketsByEventId, getTicketsByUserId, updateTicket } from '../controllers/ticketController.js';

const router = express.Router();

// Ticket routes
router.post('/createTicket', createTicket);
router.put('/updateTicket/:id', updateTicket);
router.get('/getTicketById/:id', getTicketById);  // Get ticket by ID
router.delete('/deleteTicket/:id', deleteTicket);
router.get('/getAllTickets', getAllTickets);      // Get all tickets
router.get('/getTicketsByEventId/:eventId', getTicketsByEventId);  // Get tickets by Event ID
router.get('/getTicketsByUserId/:userId', getTicketsByUserId);    // Get tickets by User ID


export default router;
