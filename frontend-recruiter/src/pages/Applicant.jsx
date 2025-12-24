import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Session expired. Please login again.");
          return;
        }

        const res = await axios.get(
          "http://localhost:9265/api/applications/recruiter/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStats(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  /* ================= STATES ================= */

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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
          Recruiter Dashboard
        </h1>
        <p className="text-gray-500">
          Overview of your jobs & applications
        </p>
      </div>

     

      {/* Applications Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-700">
            Recent Applications
          </h2>
        </div>

        {stats.applications.length === 0 ? (
          <p className="p-6 text-gray-500 text-center">
            No applications found yet.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="p-3 text-left">Candidate</th>
                <th className="p-3 text-left">Job</th>
                <th className="p-3 text-left">Applied On</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {stats.applications.map((app) => (
                <tr
                  key={app._id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-3">
                    <div className="font-medium">
                      {app.applicant?.name}
                    </div>
                    <div className="text-gray-500 text-xs">
                      {app.applicant?.email}
                    </div>
                  </td>

                  <td className="p-3">
                    {app.job?.title}
                  </td>

                  <td className="p-3 text-gray-600">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-3">
                    <StatusBadge status={app.status} />
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

/* ================= REUSABLE COMPONENTS ================= */

const StatCard = ({ title, value, color }) => {
  const colors = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    purple: "bg-purple-100 text-purple-700",
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="text-gray-500">{title}</div>
      <div className={`mt-2 text-3xl font-bold ${colors[color]}`}>
        {value}
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    pending: "bg-yellow-100 text-yellow-700",
    accepted: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        styles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status || "pending"}
    </span>
  );
};

export default Dashboard;
