import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: 'bi-person-badge',
      title: 'Profile Setup',
      description: 'Create your personalized profile and track your progress throughout your placement journey.',
      color: 'primary'
    },
    {
      icon: 'bi-question-circle',
      title: 'Aptitude Tests',
      description: 'Practice domain-specific aptitude questions with instant scoring and detailed explanations.',
      color: 'success'
    },
    {
      icon: 'bi-map',
      title: 'Learning Roadmaps',
      description: 'Get personalized learning paths tailored to your chosen domain and career goals.',
      color: 'info'
    },
    {
      icon: 'bi-trophy',
      title: 'Progress Leaderboard',
      description: 'Compete with peers, track your rankings, and stay motivated throughout your preparation.',
      color: 'warning'
    }
  ];

  return (
    <div className="container mt-4">
      {/* Hero Section */}
      <div className="row align-items-center min-vh-50 py-5">
        <div className="col-lg-6">
          <h1 className="display-4 fw-bold text-primary mb-4">
            Ace Your Placements with 
            <span className="text-dark d-block">PrepTrack</span>
          </h1>
          <p className="lead mb-4 text-muted">
            Your comprehensive platform for placement preparation. Transform your placement journey 
            with personalized guidance, practice tests, progress tracking, and AI-powered assistance.
          </p>
          
          {!user ? (
            <div className="mt-4">
              <Link to="/register" className="btn btn-primary btn-lg me-3 px-4 py-2">
                <i className="bi bi-rocket-takeoff me-2"></i>
                Start Your Journey
              </Link>
              <Link to="/login" className="btn btn-outline-primary btn-lg px-4 py-2">
                <i className="bi bi-box-arrow-in-right me-2"></i>
                Login
              </Link>
            </div>
          ) : (
            <div className="mt-4">
              <h4 className="text-success mb-3">
                <i className="bi bi-check-circle me-2"></i>
                Welcome back, {user.fullName || user.username}!
              </h4>
              <div className="d-flex flex-wrap gap-2">
                <Link to="/aptitude" className="btn btn-primary btn-lg">
                  <i className="bi bi-play-circle me-2"></i>
                  Take Aptitude Test
                </Link>
                <Link to="/roadmap" className="btn btn-outline-primary btn-lg">
                  <i className="bi bi-compass me-2"></i>
                  View Roadmap
                </Link>
                <Link to="/leaderboard" className="btn btn-success btn-lg">
                  <i className="bi bi-trophy me-2"></i>
                  Check Leaderboard
                </Link>
              </div>
            </div>
          )}
        </div>
        
        <div className="col-lg-6 text-center">
          <div className="bg-gradient-primary p-5 rounded-3 shadow">
            <i className="bi bi-graph-up-arrow display-1 text-white"></i>
            <h3 className="text-white mt-3">Track Your Progress</h3>
            <p className="text-white-50 mb-0">Monitor your growth and compete with peers in real-time</p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="row mt-5 py-5">
        <div className="col-12 text-center mb-5">
          <h2 className="display-5 fw-bold text-dark">Why Choose PrepTrack?</h2>
          <p className="lead text-muted">Everything you need for successful placement preparation</p>
        </div>
        
        {features.map((feature, index) => (
          <div key={index} className="col-lg-3 col-md-6 mb-4">
            <div className="card h-100 border-0 shadow-sm hover-shadow">
              <div className="card-body text-center p-4">
                <div className={`bg-${feature.color} bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3`}
                     style={{ width: '80px', height: '80px' }}>
                  <i className={`${feature.icon} text-${feature.color} display-6`}></i>
                </div>
                <h5 className="card-title fw-bold">{feature.title}</h5>
                <p className="card-text text-muted">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="row mt-5 py-4 bg-light rounded-3">
        <div className="col-md-3 text-center">
          <h3 className="text-primary fw-bold">1000+</h3>
          <p className="text-muted">Practice Questions</p>
        </div>
        <div className="col-md-3 text-center">
          <h3 className="text-success fw-bold">3</h3>
          <p className="text-muted">Learning Domains</p>
        </div>
        <div className="col-md-3 text-center">
          <h3 className="text-info fw-bold">24/7</h3>
          <p className="text-muted">AI Assistant</p>
        </div>
        <div className="col-md-3 text-center">
          <h3 className="text-warning fw-bold">∞</h3>
          <p className="text-muted">Progress Tracking</p>
        </div>
      </div>
    </div>
  );
};

export default Home;