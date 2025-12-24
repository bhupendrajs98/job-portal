import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(
          "http://localhost:9265/api/jobs",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // 🔥 Sirf recruiter ki jobs
        const myJobs = res.data.jobs.filter(
          (job) => job.postedBy?._id === user.id
        );

        setJobs(myJobs);
      } catch (error) {
        console.error("FETCH JOBS ERROR", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

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
        <div className="text-center text-gray-500">
          Loading jobs...
        </div>
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
                {/* <p className="text-sm text-gray-400">
                  Applicants: {job.applicantsCount || 0}
                </p> */}
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
      {!loading && jobs.length === 0 && (
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
