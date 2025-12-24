import Job from "../models/Job.js";
import Application from "../models/Application.js";

export const recruiterReport = async (req, res) => {
  try {
    if (req.user.role !== "recruiter") {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    // Recruiter jobs
    const jobs = await Job.find({ postedBy: req.user._id });

    const jobIds = jobs.map((job) => job._id);

    // Applications for those jobs
    const applications = await Application.find({
      job: { $in: jobIds },
    });

    const report = {
      totalJobs: jobs.length,
      totalApplications: applications.length,
      accepted: applications.filter((a) => a.status === "accepted").length,
      rejected: applications.filter((a) => a.status === "rejected").length,
      pending: applications.filter((a) => a.status === "pending").length,
      jobs: jobs.map((job) => ({
        _id: job._id,
        title: job.title,
        applications: applications.filter(
          (a) => a.job.toString() === job._id.toString()
        ).length,
      })),
    };

    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to generate report",
      error: error.message,
    });
  }
};
