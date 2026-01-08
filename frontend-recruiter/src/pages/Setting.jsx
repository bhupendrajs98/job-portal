import React, { useEffect, useState } from "react";
import API from "../../services/api"; // Axios instance with token interceptor

const Setting = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyName: "",
  });

  /* ================= FETCH PROFILE ================= */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/users/profile");
        const user = res.data.user;

        setFormData({
          name: user.name || "",
          email: user.email || "",
          companyName: user.companyName || "",
        });
      } catch (err) {
        console.error("FETCH PROFILE ERROR:", err);
        setError(err.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setSaving(true);
      await API.put("/users/profile", formData);
      setSuccess("Profile updated successfully 🎉");
    } catch (err) {
      console.error("UPDATE PROFILE ERROR:", err);
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  /* ================= STATES ================= */
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-12 w-12 border-b-2 border-blue-600 rounded-full"></div>
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-500">
          Manage your account & company information
        </p>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>
      )}

      {success && (
        <div className="bg-green-100 text-green-700 p-3 rounded">{success}</div>
      )}

      {/* Profile Form */}
      <form
        onSubmit={handleSave}
        className="bg-white shadow rounded-lg p-6 space-y-4"
      >
        <h2 className="text-lg font-semibold text-gray-700">
          Profile Information
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 text-white px-6 py-2 rounded
                     hover:bg-blue-700 transition disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default Setting;
