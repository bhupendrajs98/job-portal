import axios from "axios";

const API = axios.create({
  baseURL: "https://job-portal-render.onrender.com", 
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// AUTH
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);

// JOBS
export const getAllJobs = () => API.get("/jobs");
export const getJobById = (jobId) => API.get(`/jobs/${jobId}`);
export const createJob = (jobData) => API.post("/jobs", jobData);
export const updateJob = (jobId, jobData) => API.put(`/jobs/${jobId}`, jobData);
export const deleteJob = (jobId) => API.delete(`/jobs/${jobId}`);
export const getJobApplicants = (jobId) => API.get(`/jobs/${jobId}/applicants`);

// APPLICATIONS
export const applyForJob = (jobId, data) =>
  API.post(`/applications/apply/${jobId}`, data);
export const getMyApplications = () => API.get("/applications/my");
export const getApplicationsForJob = (jobId) => API.get(`/applications/job/${jobId}`);
export const updateApplicationStatus = (applicationId, status) =>
  API.put(`/applications/${applicationId}`, { status });

export default API;
