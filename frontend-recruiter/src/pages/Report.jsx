import React, { useEffect, useState } from "react";
import axios from "axios";

const Report = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Session expired. Please login again.");
          return;
        }

        const res = await axios.get(
          "http://localhost:9265/api/reports/recruiter",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setReport(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load report");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  /* ================= STATES ================= */

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-12 w-12 border-b-2 border-blue-600 rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded">
        {error}
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Reports & Analytics
        </h1>
        <p className="text-gray-500">
          Overview of your recruitment performance
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Jobs" value={report.totalJobs} />
        <StatCard title="Applications" value={report.totalApplications} />
        <StatCard title="Accepted" value={report.accepted} color="green" />
        <StatCard title="Rejected" value={report.rejected} color="red" />
      </div>

      {/* Jobs Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-gray-700">
            Job-wise Applications
          </h2>
        </div>

        {report.jobs.length === 0 ? (
          <p className="p-6 text-center text-gray-500">
            No jobs found
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="p-3 text-left">Job Title</th>
                <th className="p-3 text-left">Applications</th>
              </tr>
            </thead>
            <tbody>
              {report.jobs.map((job) => (
                <tr key={job._id} className="border-t">
                  <td className="p-3 font-medium">
                    {job.title}
                  </td>
                  <td className="p-3">
                    {job.applications}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

/* ================= COMPONENTS ================= */

const StatCard = ({ title, value, color = "blue" }) => {
  const colors = {
    blue: "text-blue-700 bg-blue-100",
    green: "text-green-700 bg-green-100",
    red: "text-red-700 bg-red-100",
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="text-gray-500">{title}</div>
      <div
        className={`mt-2 text-3xl font-bold px-3 py-1 inline-block rounded ${colors[color]}`}
      >
        {value}
      </div>
    </div>
  );
};

export default Report;
