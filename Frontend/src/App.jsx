import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import LandingPage from './pages/LandingPage';
import WorkerDashboard from "./pages/WorkerDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import Profile from './pages/Profile';

const App = () => {
  return (
    <Router>
      <Routes>
 <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/worker-dashboard" element={<WorkerDashboard />} />
  <Route path="/employer-dashboard" element={<EmployerDashboard />} />
  <Route path="/profile" element={<Profile />} />

      </Routes>
    </Router>
  );
};

export default App;
