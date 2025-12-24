import React from "react";
import { FiSearch, FiMapPin } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleFindJobs = () => {
    navigate("/jobs");
  };

  return (
    <section className="w-full min-h-[calc(100vh-80px)] bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Search Bar */}
        <div className="bg-white/80 backdrop-blur shadow-2xl rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center">

          {/* Job Input */}
          <div className="flex items-center w-full md:w-2/5 border rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 transition">
            <FiSearch className="text-gray-400 text-xl mr-3" />
            <input
              type="text"
              placeholder="Job title, keywords or company"
              className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* Location Input */}
          <div className="flex items-center w-full md:w-2/5 border rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 transition">
            <FiMapPin className="text-gray-400 text-xl mr-3" />
            <input
              type="text"
              placeholder="Location"
              className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* Button */}
          <button
            onClick={handleFindJobs}
            className="w-full md:w-1/5 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg"
          >
            Find Jobs
          </button>
        </div>

        {/* Content Section */}
        <div className="mt-16 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600">
            HireOn
          </h1>

          <p className="mt-4 text-2xl font-semibold text-gray-900">
            Start your dream job here!
          </p>

          <p className="mt-4 text-gray-600 leading-relaxed">
            Create an account or sign in to see your personalised job
            recommendations.
          </p>

          <button className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg">
            Get Started
          </button>
        </div>

      </div>
    </section>
  );
}

export default Home;
