import { useEffect, useState } from "react";
import JobCard from "../components/Jobcard";
import { getAllJobs } from "../services/api";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await getAllJobs();
      setJobs(res.data.jobs || res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load jobs. Backend might not be connected.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => 
    job.title?.toLowerCase().includes(search.toLowerCase()) &&
    job.location?.toLowerCase().includes(location.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Find Jobs</h1>
          <p className="text-gray-600">Explore latest opportunities</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by job title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 border rounded px-3 py-2 focus:outline-none focus:ring"
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full md:w-1/2 border rounded px-3 py-2 focus:outline-none focus:ring"
          />
        </div>

        {loading && <p className="text-center text-gray-600">Loading jobs...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && filteredJobs.length === 0 && (
          <p className="text-center text-gray-600">No jobs found</p>
        )}

        <div className="grid gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
