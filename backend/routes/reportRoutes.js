import express from "express";
import { recruiterReport } from "../controllers/reportController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Recruiter Report
router.get("/recruiter", authMiddleware, recruiterReport);

export default router;
