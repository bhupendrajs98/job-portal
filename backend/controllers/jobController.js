import Job from "../models/Job.js";
import Application from "../models/Application.js";

/* =====================================================
   CREATE JOB (Recruiter only)
   POST /api/jobs
===================================================== */
export const createJob = async (req, res) => {
  try {
    // 🔒 Recruiter check
    if (!req.user || req.user.role !== "recruiter") {
      return res.status(403).json({
        success: false,
        message: "Only recruiters can post jobs",
      });
    }

    const {
      title,
      company,
      location,
      jobType,
      experience,
      skills,
      salary,
      description,
    } = req.body;

    const job = await Job.create({
      title,
      company,
      location,
      jobType,
      experience,
      skills,
      salary: Number(salary) || 0,
      description,
      postedBy: req.user._id,        // 🔥 recruiter from token
      companyName: req.user.companyName || "",
    });

    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    console.error("CREATE JOB ERROR 👉", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =====================================================
   GET ALL JOBS (Public + Recruiter Dashboard)
   GET /api/jobs
===================================================== */
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ isActive: true })
      .populate("postedBy", "name email companyName")
      .sort({ createdAt: -1 });

    let totalApplicants = 0;

    // Recruiter dashboard data
    if (req.user && req.user.role === "recruiter") {
      const counts = await Promise.all(
        jobs.map((job) =>
          Application.countDocuments({ job: job._id })
        )
      );
      totalApplicants = counts.reduce((a, b) => a + b, 0);
    }

    return res.status(200).json({
      success: true,
      count: jobs.length,
      totalApplicants,
      jobs,
    });
  } catch (error) {
    console.error("GET JOBS ERROR 👉", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =====================================================
   GET SINGLE JOB
   GET /api/jobs/:id
===================================================== */
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "postedBy",
      "name email companyName"
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.error("GET JOB ERROR 👉", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =====================================================
   UPDATE JOB (Recruiter only)
   PUT /api/jobs/:id
===================================================== */
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    console.error("UPDATE JOB ERROR 👉", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =====================================================
   DELETE JOB (Recruiter only)
   DELETE /api/jobs/:id
===================================================== */
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    await job.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.error("DELETE JOB ERROR 👉", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =====================================================
   VIEW JOB APPLICANTS (Recruiter only)
   GET /api/jobs/:id/applicants
===================================================== */
export const getJobApplicants = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    const applications = await Application.find({ job: job._id })
      .populate("applicant", "name email skills experience")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.error("GET APPLICANTS ERROR 👉", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
