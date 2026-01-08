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

router.post("/apply/:jobId", authMiddleware, applyJob);
router.get("/my", authMiddleware, getMyApplications);
router.get("/job/:jobId", authMiddleware, getApplicationsForJob);
router.put("/:applicationId", authMiddleware, updateApplicationStatus);
router.get("/recruiter/dashboard", authMiddleware, getRecruiterDashboard);

export default router;
