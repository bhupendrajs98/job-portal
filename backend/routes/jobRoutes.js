import express from "express";
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  getJobApplicants,
} from "../controllers/jobController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ================= PUBLIC ROUTES =================
router.get("/", getAllJobs);
router.get("/:id", getJobById);

// ================= PROTECTED ROUTES =================

// Recruiter - Create Job
router.post("/", authMiddleware, createJob);

// Recruiter - Update Job
router.put("/:id", authMiddleware, updateJob);

// Recruiter - Delete Job
router.delete("/:id", authMiddleware, deleteJob);

// Recruiter - View Applicants of a Job
router.get("/:id/applicants", authMiddleware, getJobApplicants);

export default router;
