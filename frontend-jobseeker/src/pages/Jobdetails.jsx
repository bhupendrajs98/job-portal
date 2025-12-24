import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FiMapPin, FiBriefcase, FiDollarSign } from "react-icons/fi";

function JobDetails() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(
          `http://localhost:9265/api/jobs/${jobId}`
        );
        const data = await res.json();
        setJob(data.job || data);
      } catch (error) {
        console.error("Failed to fetch job details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium">Loading job details...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-xl font-semibold mb-4">Job not found</p>
        <Link to="/" className="text-blue-600 underline">
          Go back
        </Link>
      </div>
    );
  }

  return (
    <section className="w-full min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
          <p className="text-gray-700 font-medium">{job.company}</p>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-4">
            <span className="flex items-center gap-1">
              <FiMapPin /> {job.location}
            </span>
            <span className="flex items-center gap-1">
              <FiBriefcase /> {job.jobType}
            </span>
            <span className="flex items-center gap-1">
              <FiDollarSign /> {job.salary}
            </span>
          </div>
        </div>

        {/* Job Description */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-3">Job Description</h2>
          <p className="text-gray-700 leading-relaxed">
            {job.description}
          </p>
        </div>

        {/* Skills */}
        {job.skills?.length > 0 && (
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h2 className="text-lg font-semibold mb-3">Required Skills</h2>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Apply Section */}
        <div className="bg-white rounded-xl shadow p-6 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">
              Posted on: {new Date(job.createdAt).toDateString()}
            </p>
          </div>

          <Link
            to={`/apply/${job._id}`}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </section>
  );
}

export default JobDetails;
