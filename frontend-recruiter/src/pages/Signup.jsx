// src/pages/Signup.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api"; // Axios instance with baseURL

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "jobseeker", // default
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= HANDLE INPUT CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ================= HANDLE FORM SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await API.post("/auth/register", formData);

      if (data.success) {
        // Signup success → redirect to signin
        alert("Signup successful 🎉");
        navigate("/signin");
      } else {
        throw new Error(data.message || "Signup failed");
      }
    } catch (err) {
      console.error("SIGNUP ERROR:", err);
      setError(err.response?.data?.message || err.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">

        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-2">
          Create your Hireon account
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Start your journey with better opportunities
        </p>

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* Role Selection */}
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="jobseeker"
                checked={formData.role === "jobseeker"}
                onChange={handleChange}
              />
              Job Seeker
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="recruiter"
                checked={formData.role === "recruiter"}
                onChange={handleChange}
              />
              Recruiter
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-600 font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
