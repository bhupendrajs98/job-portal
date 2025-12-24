import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signin");
  };

  const handlePostJob = () => {
    const recruiterAppURL =
      import.meta.env.VITE_RECRUITER_APP_URL || "http://localhost:5174";

    const token = localStorage.getItem("token");

    if (!token) {
      // Redirect to recruiter login
      window.location.href = `${recruiterAppURL}/login`;
      return;
    }

    // Redirect to recruiter post job/dashboard
    window.location.href = `${recruiterAppURL}/post-job`;
  };

  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Left Section */}
        <div className="flex items-center gap-10">
          <h1
            onClick={() => navigate("/")}
            className="text-2xl font-bold text-blue-600 cursor-pointer"
          >
            Hireon
          </h1>

          <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
            <li>
              <Link to="/" className="hover:text-blue-600 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/reviews" className="hover:text-blue-600 transition">
                Company Reviews
              </Link>
            </li>
            <li>
              <Link to="/salary" className="hover:text-blue-600 transition">
                Salary Guide
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {!token ? (
            <button
              onClick={() => navigate("/signin")}
              className="text-gray-700 font-medium hover:text-blue-600 transition"
            >
              Sign in
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="text-red-600 font-medium hover:text-red-700 transition"
            >
              Sign out
            </button>
          )}

          <button
            onClick={handlePostJob}
            className="bg-blue-600 text-white px-5 py-2 rounded-md font-semibold hover:bg-blue-700 transition shadow"
          >
            Post Job
          </button>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
