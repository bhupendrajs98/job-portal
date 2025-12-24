import React from "react";
import { FiMapPin, FiBriefcase, FiClock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function JobCard({ job }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/jobs/${job._id}`)}
      className="group bg-white border border-gray-200 rounded-2xl p-6 
                 shadow-sm hover:shadow-xl hover:-translate-y-1 
                 transition-all duration-300 cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition">
            {job.title}
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            {job.company}
          </p>
        </div>

        {/* Salary Badge */}
        <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          {job.salary}
        </span>
      </div>

      {/* Meta Info */}
      <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <FiMapPin className="text-gray-400" />
          <span>{job.location}</span>
        </div>

        <div className="flex items-center gap-1">
          <FiBriefcase className="text-gray-400" />
          <span>{job.jobType}</span>
        </div>

        <div className="flex items-center gap-1">
          <FiClock className="text-gray-400" />
          <span>
            {new Date(job.createdAt).toDateString()}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="mt-4 text-sm text-gray-600 leading-relaxed line-clamp-2">
        {job.description}
      </p>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between">
        <span className="text-xs text-gray-500">
          Click to view full details
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/jobs/${job._id}`);
          }}
          className="px-5 py-2 text-sm font-medium text-white 
                     bg-blue-600 rounded-lg hover:bg-blue-700 
                     transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default JobCard;
