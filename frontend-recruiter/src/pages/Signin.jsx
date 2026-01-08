// src/pages/Signin.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api"; // axios instance with baseURL & token interceptor

function Signin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      // Login request via API instance
      const { data } = await API.post("/auth/login", {
        email: formData.email.trim(),
        password: formData.password,
      });

      if (!data?.token || !data?.user) {
        throw new Error("Invalid response from server");
      }

      // Save auth data in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Role-based redirect
      switch (data.user.role) {
        case "recruiter":
          navigate("/recruiter/dashboard", { replace: true });
          break;
        case "jobseeker":
          navigate("/", { replace: true });
          break;
        default:
          navigate("/", { replace: true });
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-2">
          Sign in to Hireon
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Find your next opportunity
        </p>

        {/* Error Message */}
        {error && (
          <p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center mt-6 text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signin;
