import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api"; // Axios instance with live backend

const Jobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get("/jobs");

        // 🔥 Sirf recruiter ki jobs
        const myJobs = res.data.jobs.filter(
          (job) => job.postedBy?._id === user.id
        );

        setJobs(myJobs);
      } catch (err) {
        console.error("FETCH JOBS ERROR", err);
        setError("Failed to load jobs. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [user.id]);

  /* ================= UI ================= */

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Jobs</h1>
          <p className="text-gray-500">Manage your posted jobs</p>
        </div>

        <button
          onClick={() => navigate("/recruiter/jobs/create")}
          className="bg-blue-600 text-white px-5 py-2 rounded-md font-semibold
                     hover:bg-blue-700 transition shadow"
        >
          + Create Job
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center text-gray-500">Loading jobs...</div>
      )}

      {/* Error */}
      {error && (
        <div className="text-center text-red-600">{error}</div>
      )}

      {/* Job List */}
      {!loading && jobs.length > 0 && (
        <div className="grid gap-4">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white shadow rounded-lg p-6 flex
                         items-center justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {job.title}
                </h3>
                <p className="text-gray-500 text-sm">
                  {job.location} • {job.jobType}
                </p>
                <p className="text-sm text-gray-400">
                  Applicants: {job.applicants?.length || 0}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() =>
                    navigate(`/recruiter/jobs/${job._id}/applicants`)
                  }
                  className="px-4 py-2 text-sm border rounded hover:bg-gray-100"
                >
                  Applicants
                </button>

                <button
                  onClick={() =>
                    navigate(`/recruiter/jobs/edit/${job._id}`)
                  }
                  className="px-4 py-2 text-sm border rounded hover:bg-gray-100"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && jobs.length === 0 && !error && (
        <div className="bg-white shadow rounded-lg p-10 text-center">
          <p className="text-gray-500">
            You haven’t posted any jobs yet.
          </p>
          <button
            onClick={() => navigate("/recruiter/jobs/create")}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md
                       hover:bg-blue-700 transition"
          >
            Post Your First Job
          </button>
        </div>
      )}
    </div>
  );
};

export default Jobs;
