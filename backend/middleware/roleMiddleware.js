export const recruiterOnly = (req, res, next) => {
  if (req.user && req.user.role === "recruiter") {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: "Access denied: Recruiter only",
    });
  }
};

export const jobSeekerOnly = (req, res, next) => {
  if (req.user && req.user.role === "jobseeker") {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: "Access denied: Job Seeker only",
    });
  }
};
