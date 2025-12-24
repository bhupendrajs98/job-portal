import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Session expired. Please login again.");
      return;
    }

    try {
      setLoading(true);

      // skills string -> array
      const payload = {
        ...formData,
        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim()),
      };

      await axios.post("http://localhost:9265/api/jobs", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setSuccess("🎉 Job created successfully!");

      setTimeout(() => {
        navigate("/recruiter/jobs");
      }, 1200);
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
      <p className="text-gray-500 mb-6">
        Fill in the details to post a new job
      </p>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Job Title */}
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded"
        />

        {/* Company */}
        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={formData.company}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded"
        />

        {/* Location */}
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded"
        />

        {/* Job Type */}
        <select
          name="jobType"
          value={formData.jobType}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Internship</option>
          <option>Remote</option>
        </select>

        {/* Experience */}
        <input
          type="text"
          name="experience"
          placeholder="Experience (e.g. 0-2 years)"
          value={formData.experience}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded"
        />

        {/* Skills */}
        <input
          type="text"
          name="skills"
          placeholder="Skills (comma separated e.g. React, Node)"
          value={formData.skills}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded"
        />

        {/* Salary */}
        <input
          type="number"
          name="salary"
          placeholder="Salary (optional)"
          value={formData.salary}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Job Description"
          rows="5"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded"
        />

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded
                       hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Posting..." : "Create Job"}
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="border px-6 py-2 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateJob;
