import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="landing-content">
        <div className="logo-container">
          <div className="logo-circle">
            <span className="logo-text">H</span>
          </div>
        </div>

        <h1><b>HireLink</b></h1>
        <h2 className="title"> Connecting Workers with Opportunities</h2>
        <p className="tagline">
          Find skilled <span className="highlight">local labor</span> or get hired in your community
        </p>
        
        <div className="buttons">
          <button onClick={() => navigate('/login')} className="btn primary-btn">Login</button>
          <button onClick={() => navigate('/register')} className="btn secondary-btn">Register</button>
        </div>
        
        <div className="features">
          <div className="feature-item">
            <div className="feature-icon">🔨</div>
            <h3>Skilled Workers</h3>
            <p>Find qualified professionals for any job</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">💼</div>
            <h3>Job Opportunities</h3>
            <p>Discover work in your local area</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🤝</div>
            <h3>Trusted Community</h3>
            <p>Verified workers and employers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;