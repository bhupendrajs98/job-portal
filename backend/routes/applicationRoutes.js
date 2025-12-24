import express from "express";
import {
  applyJob,
  getMyApplications,
  getApplicationsForJob,
  updateApplicationStatus,
  getRecruiterDashboard,
} from "../controllers/applicationController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ================= JOB SEEKER =================

// Apply for a job
router.post("/apply/:jobId", authMiddleware, applyJob);

// Get logged-in user's applications
router.get("/my", authMiddleware, getMyApplications);

// ================= RECRUITER =================

// Get applications for a specific job
router.get("/job/:jobId", authMiddleware, getApplicationsForJob);

// Update application status (shortlist / reject / hire)
router.put("/:applicationId", authMiddleware, updateApplicationStatus);

// Get recruiter dashboard data (total jobs, total applications, recent applications)
router.get("/recruiter/dashboard", authMiddleware, getRecruiterDashboard);

export default router;
