import { Router } from "express";
import { scheduleMeeting } from "../controllers/meeting.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/schedule-meeting", authMiddleware, scheduleMeeting);

export default router;

