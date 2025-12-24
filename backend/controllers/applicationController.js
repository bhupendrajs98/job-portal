import Application from "../models/Application.js";
import Job from "../models/Job.js";

/* ======================================================
   APPLY FOR JOB (Job Seeker)
   POST /api/applications/apply/:jobId
====================================================== */
export const applyJob = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "jobseeker") {
      return res.status(403).json({
        success: false,
        message: "Only job seekers can apply for jobs",
      });
    }

    const { jobId } = req.params;
    const { resume, coverLetter } = req.body;

    if (!resume) {
      return res.status(400).json({
        success: false,
        message: "Resume is required",
      });
    }

    const job = await Job.findById(jobId);
    if (!job || job.isActive === false) {
      return res.status(404).json({
        success: false,
        message: "Job not found or inactive",
      });
    }

    const alreadyApplied = await Application.findOne({
      job: jobId,
      applicant: req.user.id,
    });

    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    const application = await Application.create({
      job: jobId,
      applicant: req.user.id,
      recruiter: job.postedBy,
      resume,
      coverLetter,
    });

    return res.status(201).json({
      success: true,
      message: "Applied successfully",
      application,
    });
  } catch (error) {
    console.error("Apply Job Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/* ======================================================
   GET MY APPLICATIONS (Job Seeker)
   GET /api/applications/my
====================================================== */
export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      applicant: req.user.id,
    })
      .populate("job", "title company location jobType")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.error("Get My Applications Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
    });
  }
};

/* ======================================================
   GET APPLICATIONS FOR A JOB (Recruiter)
   GET /api/applications/job/:jobId
====================================================== */
export const getApplicationsForJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    const applications = await Application.find({ job: jobId })
      .populate("applicant", "name email skills experience")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.error("Get Job Applications Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch job applications",
    });
  }
};

/* ======================================================
   UPDATE APPLICATION STATUS (Recruiter)
   PATCH /api/applications/:applicationId/status
====================================================== */
export const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    if (application.recruiter.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    application.status = status;
    await application.save();

    res.status(200).json({
      success: true,
      message: "Status updated",
      application,
    });
  } catch (error) {
    console.error("Update Status Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update status",
    });
  }
};

/* ======================================================
   RECRUITER DASHBOARD
   GET /api/applications/recruiter/dashboard
====================================================== */
export const getRecruiterDashboard = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "recruiter") {
      return res.status(403).json({
        success: false,
        message: "Only recruiters can access dashboard",
      });
    }

    // Jobs posted by recruiter
    const jobs = await Job.find({
      postedBy: req.user.id,
      isActive: true,
    });

    const jobIds = jobs.map((job) => job._id);

    // Applications on those jobs
    const applications = await Application.find({
      job: { $in: jobIds },
    })
      .populate("job", "title company")
      .populate("applicant", "name email")
      .sort({ createdAt: -1 });

    // Recent (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentApplications = applications.filter(
      (app) => app.createdAt >= sevenDaysAgo
    ).length;

    res.status(200).json({
      success: true,
      totalJobs: jobs.length,
      totalApplications: applications.length,
      recentApplications,
      applications,
    });
  } catch (error) {
    console.error("Recruiter Dashboard Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard data",
    });
  }
};
