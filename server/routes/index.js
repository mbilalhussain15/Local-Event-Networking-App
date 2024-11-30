import express from "express";
import userRoutes from "./userRoutes.js";
import eventRoutes from './eventRoutes.js'

const router = express.Router();

router.use("/event",eventRoutes); //api/user/login


export default router;