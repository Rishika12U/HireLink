import React, { useState, useEffect } from "react";
import API from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import "./EmployerDashboard.css";

const EmployerDashboard = () => {
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
  });

  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await API.post("/jobs", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Job posted successfully!");
      setForm({ title: "", description: "", location: "" });
      fetchJobs();
    } catch (err) {
      alert("Failed to post job");
      console.error(err.response?.data || err.message);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/jobs/my-jobs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  const updateStatus = async (jobId, applicantUserId, status) => {
    try {
      const token = localStorage.getItem("token");
      await API.put(
        `/jobs/${jobId}/applicants/${applicantUserId}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchJobs(); // refresh after update
    } catch (err) {
      console.error("Status update failed", err.response?.data || err.message);
    }
  };

  const handleDelete = async (jobId) => {
    const confirm = window.confirm("Are you sure you want to delete this job?");
    if (!confirm) return;

    try {
      await API.delete(`/jobs/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Job deleted successfully!");
      setJobs((prev) => prev.filter((job) => job._id !== jobId));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Error occurred");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="employer-dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Employer Dashboard</h1>
        <div className="header-actions">
          <button className="btn profile-btn" onClick={() => navigate("/profile")}>
            View/Edit Profile
          </button>
          <button className="btn logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="dashboard-section">
        <h2 className="section-title">Post a New Job</h2>
        <form onSubmit={handleSubmit} className="job-form">
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={form.title}
            onChange={handleChange}
            required
            className="form-input"
          />
          <textarea
            name="description"
            placeholder="Job Description"
            value={form.description}
            onChange={handleChange}
            className="form-textarea"
            rows="4"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            className="form-input"
          />
          <button type="submit" className="btn submit-btn">
            Post Job
          </button>
        </form>
      </div>

      <div className="divider"></div>

      <div className="dashboard-section">
        <h2 className="section-title">Your Posted Jobs</h2>
        {jobs.length === 0 ? (
          <p className="no-results">No jobs posted yet.</p>
        ) : (
          <div className="jobs-list">
            {jobs.map((job) => (
              <div key={job._id} className="job-card">
                <div className="job-header">
                  <h3 className="job-title">{job.title}</h3>
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="btn delete-btn"
                  >
                    Delete Job
                  </button>
                </div>
                <p className="job-location">📍 {job.location}</p>
                <p className="job-description">{job.description}</p>

                <h4 className="applicants-title">Applicants:</h4>
                {job.applicants?.length === 0 ? (
                  <p className="no-applicants">No applicants yet.</p>
                ) : (
                  <div className="applicants-list">
                    {job.applicants.map((app, index) => (
                      <div key={index} className="applicant-card">
                        <div className="applicant-info">
                          <h5 className="applicant-name">{app.user?.name}</h5>
                          <p className="applicant-email">{app.user?.email}</p>
                          {app.user?.location && (
                            <p className="applicant-location">
                              📍 {app.user.location}
                            </p>
                          )}
                          {app.user?.skills?.length > 0 && (
                            <p className="applicant-skills">
                              🛠️ {app.user.skills.join(", ")}
                            </p>
                          )}
                          <div className={`status-badge ${app.status}`}>
                            {app.status}
                          </div>
                        </div>
                        <div className="applicant-actions">
                          <button
                            onClick={() => updateStatus(job._id, app.user._id, "accepted")}
                            disabled={app.status === "accepted"}
                            className="btn approve-btn"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => updateStatus(job._id, app.user._id, "rejected")}
                            disabled={app.status === "rejected"}
                            className="btn reject-btn"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerDashboard;