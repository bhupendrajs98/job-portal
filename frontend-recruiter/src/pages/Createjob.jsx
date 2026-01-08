import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api"; // Axios instance with live backend & token

const CreateJob = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    jobType: "Full-time",
    salary: "",
    experience: "0-2 years",
    skills: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setLoading(true);

      const payload = {
        ...formData,
        skills: formData.skills.split(",").map((skill) => skill.trim()),
      };

      await API.post("/jobs", payload); // token auto attached via API instance

      setSuccess("🎉 Job created successfully!");
      setTimeout(() => navigate("/recruiter/jobs"), 1200);
    } catch (err) {
      console.error("CREATE JOB ERROR:", err.response?.data);
      setError(err.response?.data?.message || "Failed to create job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-1">Create Job</h1>
      <p className="text-gray-500 mb-6">Fill in the details to post a new job</p>

      {error && <Alert type="error" message={error} />}
      {success && <Alert type="success" message={success} />}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Job Title" value={formData.title} onChange={handleChange} required className="w-full border p-3 rounded" />
        <input type="text" name="company" placeholder="Company Name" value={formData.company} onChange={handleChange} required className="w-full border p-3 rounded" />
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required className="w-full border p-3 rounded" />

        <select name="jobType" value={formData.jobType} onChange={handleChange} className="w-full border p-3 rounded">
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Internship</option>
          <option>Remote</option>
        </select>

        <input type="text" name="experience" placeholder="Experience (e.g. 0-2 years)" value={formData.experience} onChange={handleChange} required className="w-full border p-3 rounded" />
        <input type="text" name="skills" placeholder="Skills (comma separated e.g. React, Node)" value={formData.skills} onChange={handleChange} required className="w-full border p-3 rounded" />
        <input type="number" name="salary" placeholder="Salary (optional)" value={formData.salary} onChange={handleChange} className="w-full border p-3 rounded" />
        <textarea name="description" placeholder="Job Description" rows="5" value={formData.description} onChange={handleChange} required className="w-full border p-3 rounded" />

        <div className="flex gap-3">
          <button type="submit" disabled={loading} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50">
            {loading ? "Posting..." : "Create Job"}
          </button>

          <button type="button" onClick={() => navigate(-1)} className="border px-6 py-2 rounded hover:bg-gray-100">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const Alert = ({ type, message }) => (
  <div className={`p-3 rounded mb-4 ${type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
    {message}
  </div>
);

export default CreateJob;
