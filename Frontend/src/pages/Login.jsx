import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import API from "../api/axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await API.post("/users/login", { email, password });

    // ✅ Get token and user from response.data
    const { token, user } = response.data;
    const role = user?.role?.toLowerCase();

    console.log("Role:", role);

    // Save to localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    // Redirect
    if (role === "worker") {
      navigate("/worker-dashboard");
    } else if (role === "employer") {
      navigate("/employer-dashboard");
    } else {
      alert("Unknown user role: " + role);
    }
  } catch (err) {
    console.error("Login failed:", err.response?.data || err.message);
    alert(err.response?.data?.message || "Login failed. Please try again.");
  }
};



  return (
    <div className="login-page-wrapper">
      <div className="login-container">
        <div className="login-card">
          <h2>Login to HireLink</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
