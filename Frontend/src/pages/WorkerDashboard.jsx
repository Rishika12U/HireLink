import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import "./WorkerDashboard.css";

const WorkerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [appliedJobs, setAppliedJobs] = useState([]);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const userId = JSON.parse(atob(token.split('.')[1])).id;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get("/jobs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobs(res.data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };

    const fetchApplied = async () => {
      try {
        const res = await API.get("/jobs/applied", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppliedJobs(res.data);
      } catch (err) {
        console.error("Error fetching applied jobs:", err);
      }
    };

    fetchJobs();
    fetchApplied();
  }, []);

  const applyToJob = async (jobId) => {
    try {
      await API.post(`/jobs/${jobId}/apply`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Applied successfully!");
      const res = await API.get("/jobs/applied", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppliedJobs(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to apply");
    }
  };

  const handleWithdraw = async (jobId) => {
    const confirm = window.confirm("Do you really want to withdraw?");
    if (!confirm) return;

    try {
      await API.put(`/jobs/${jobId}/withdraw`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAppliedJobs((prev) => prev.filter((job) => job._id !== jobId));
      alert("Application withdrawn successfully.");
    } catch (err) {
      console.error("Withdraw failed:", err);
      alert("Could not withdraw application.");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const filteredJobs = jobs.filter((job) => {
    const titleMatch = job.title.toLowerCase().includes(searchTitle.toLowerCase());
    const locationMatch = job.location.toLowerCase().includes(searchLocation.toLowerCase());
    return titleMatch && locationMatch;
  });

  return (
    <div className="worker-dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Worker Dashboard</h1>
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
        <h2 className="section-title">Available Jobs</h2>
        
        <div className="search-container">
          <input
            type="text"
            placeholder="🔍 Search by title"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            className="search-input"
          />
          <input
            type="text"
            placeholder="📍 Search by location"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="search-input"
          />
        </div>

        {filteredJobs.length === 0 ? (
          <p className="no-results">No jobs match your criteria.</p>
        ) : (
          <div className="jobs-grid">
            {filteredJobs.map((job) => (
              <div key={job._id} className="job-card">
                <h3 className="job-title">{job.title}</h3>
                <p className="job-location">📍 {job.location}</p>
                <p className="job-description">{job.description}</p>
                <button 
                  className="btn apply-btn"
                  onClick={() => applyToJob(job._id)}
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="divider"></div>

      <div className="dashboard-section">
        <h2 className="section-title">Your Applied Jobs</h2>
        {appliedJobs.length === 0 ? (
          <p className="no-results">You haven't applied to any jobs yet.</p>
        ) : (
          <div className="jobs-grid">
            {appliedJobs.map((job) => {
              const application = job.applicants.find(
                (app) => app.user === userId
              );
              const status = application?.status || "pending";

              return (
                <div key={job._id} className={`job-card applied ${status}`}>
                  <h3 className="job-title">{job.title}</h3>
                  <p className="job-location">📍 {job.location}</p>
                  <p className="job-description">{job.description}</p>
                  <div className="status-container">
                    <span className={`status-badge ${status}`}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                  </div>
                  <button 
                    className="btn withdraw-btn"
                    onClick={() => handleWithdraw(job._id)}
                  >
                    Withdraw
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkerDashboard;