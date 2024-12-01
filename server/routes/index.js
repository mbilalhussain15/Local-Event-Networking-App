import express from "express";
import userRoutes from "./userRoutes.js";
import eventRoutes from './eventRoutes.js'
import ticketRoutes from './ticketRoutes.js';

const router = express.Router();

router.use("/event",eventRoutes); //api/event
router.use("/tickets",ticketRoutes); //api/ticket



export default router;