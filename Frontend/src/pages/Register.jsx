import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import API from "../api/axios";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "worker",
    location: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const { data } = await API.post("/users/register", form);
    alert("Registration successful!");
  } catch (err) {
    alert("Registration failed");
    console.error(err.response?.data?.message || err.message);
  }
};

  return (
    <div className="login-page-wrapper">
      <div className="login-container">
        <div className="login-card">
          <div className="logo-container">
            <div className="logo-circle">
              <div className="logo-inner-circle">
                <div className="logo-icon">H</div>
              </div>
            </div>
          </div>
          
          <h2>Register on HireLink</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="name@company.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="role">Account Type</label>
              <select 
                id="role"
                name="role" 
                value={form.role} 
                onChange={handleChange}
                className="role-select"
              >
                <option value="worker">Worker</option>
                <option value="employer">Employer</option>
              </select>
            </div>
            
            <div className="input-group">
              <label htmlFor="location">Location (Optional)</label>
              <input
                id="location"
                type="text"
                name="location"
                placeholder="City, Country"
                value={form.location}
                onChange={handleChange}
              />
            </div>
            
            <button type="submit" className="login-button">Register</button>
            
            <p className="register-link">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;