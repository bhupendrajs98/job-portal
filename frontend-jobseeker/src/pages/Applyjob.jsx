import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ApplyJob() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [resume, setResume] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ✅ Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user || user.role !== "jobseeker") {
      navigate("/signin");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Please sign in to apply for this job");

      const res = await fetch(
        `http://localhost:9265/api/applications/apply/${jobId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ resume, coverLetter }),
        }
      );

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Session expired. Please sign in again.");
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to apply");
      }

      setSuccess(data.message);
      setResume("");
      setCoverLetter("");

      // ✅ Redirect after 2s
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6">Apply for this Job</h1>

        {error && (
          <p className="text-red-600 bg-red-100 p-2 rounded mb-4">{error}</p>
        )}
        {success && (
          <p className="text-green-600 bg-green-100 p-2 rounded mb-4">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Resume */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Resume (Google Drive / PDF link)
            </label>
            <input
              type="url"
              required
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              placeholder="https://drive.google.com/..."
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Cover Letter */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Cover Letter
            </label>
            <textarea
              rows="5"
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Why should we hire you?"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Applying..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ApplyJob;
