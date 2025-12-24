import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9265/api",
});

/* ===============================
   TOKEN INTERCEPTOR
================================ */

// har request me token automatically jayega
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // login ke baad store hoga
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ===============================
   AUTH APIs (Job Seeker + Recruiter)
================================ */

export const registerUser = (data) =>
  API.post("/auth/register", data);

export const loginUser = (data) =>
  API.post("/auth/login", data);

/* ===============================
   JOB APIs (Public + Recruiter)
================================ */

export const getAllJobs = () =>
  API.get("/jobs");

export const getJobById = (jobId) =>
  API.get(`/jobs/${jobId}`);

export const createJob = (jobData) =>
  API.post("/jobs", jobData); // recruiter token required

export const updateJob = (jobId, jobData) =>
  API.put(`/jobs/${jobId}`, jobData); // owner recruiter

export const deleteJob = (jobId) =>
  API.delete(`/jobs/${jobId}`); // owner recruiter

export const getJobApplicants = (jobId) =>
  API.get(`/jobs/${jobId}/applicants`); // recruiter

/* ===============================
   APPLICATION APIs
================================ */

// Job Seeker
export const applyForJob = (data) =>
  API.post("/applications/apply", data);

export const getMyApplications = () =>
  API.get("/applications/my");

// Recruiter
export const getApplicationsForJob = (jobId) =>
  API.get(`/applications/job/${jobId}`);

export const updateApplicationStatus = (applicationId, status) =>
  API.put(`/applications/${applicationId}`, { status });

export default API;
