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

router.get("/", getAllJobs);
router.get("/:id", getJobById);

router.post("/", authMiddleware, createJob);
router.put("/:id", authMiddleware, updateJob);
router.delete("/:id", authMiddleware, deleteJob);
router.get("/:id/applicants", authMiddleware, getJobApplicants);

export default router;
