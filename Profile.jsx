import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchProfile();
    fetchUserStats();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('/api/profile');
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
    setLoading(false);
  };

  const fetchUserStats = async () => {
    try {
      // This would typically come from a dedicated stats endpoint
      setStats({
        testsTaken: 12,
        averageScore: 85,
        domainsMastered: 2,
        leaderboardRank: 15
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          {/* Profile Card */}
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                   style={{ width: '100px', height: '100px' }}>
                <i className="bi bi-person-fill text-white display-4"></i>
              </div>
              <h4 className="card-title">{profile?.full_name || profile?.username}</h4>
              <p className="text-muted mb-2">@{profile?.username}</p>
              <div className={`badge bg-primary fs-6 px-3 py-2`}>
                {profile?.domain || 'Not Specified'}
              </div>
              
              <div className="mt-4">
                <p className="text-muted mb-1">
                  <i className="bi bi-envelope me-2"></i>
                  {profile?.email}
                </p>
                <p className="text-muted mb-1">
                  <i className="bi bi-building me-2"></i>
                  {profile?.college || 'Not specified'}
                </p>
                {profile?.graduation_year && (
                  <p className="text-muted mb-0">
                    <i className="bi bi-calendar me-2"></i>
                    Class of {profile?.graduation_year}
                  </p>
                )}
              </div>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="card shadow-sm mt-3">
            <div className="card-header bg-light">
              <h6 className="mb-0">
                <i className="bi bi-graph-up me-2"></i>
                Quick Stats
              </h6>
            </div>
            <div className="card-body">
              {stats ? (
                <div className="row text-center">
                  <div className="col-6 mb-3">
                    <div className="text-primary fw-bold fs-4">{stats.testsTaken}</div>
                    <small className="text-muted">Tests Taken</small>
                  </div>
                  <div className="col-6 mb-3">
                    <div className="text-success fw-bold fs-4">{stats.averageScore}%</div>
                    <small className="text-muted">Avg Score</small>
                  </div>
                  <div className="col-6">
                    <div className="text-info fw-bold fs-4">{stats.domainsMastered}</div>
                    <small className="text-muted">Domains</small>
                  </div>
                  <div className="col-6">
                    <div className="text-warning fw-bold fs-4">#{stats.leaderboardRank}</div>
                    <small className="text-muted">Rank</small>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted">
                  <small>Complete tests to see your stats</small>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="col-md-8">
          {/* Profile Information */}
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">
                <i className="bi bi-person-gear me-2"></i>
                Profile Information
              </h5>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Username</label>
                  <input type="text" className="form-control" value={profile?.username} readOnly />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Email Address</label>
                  <input type="email" className="form-control" value={profile?.email} readOnly />
                </div>
              </div>
              
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Full Name</label>
                  <input type="text" className="form-control" value={profile?.full_name || 'Not provided'} readOnly />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Primary Domain</label>
                  <input type="text" className="form-control" value={profile?.domain || 'Not specified'} readOnly />
                </div>
              </div>
              
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">College/University</label>
                  <input type="text" className="form-control" value={profile?.college || 'Not provided'} readOnly />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Graduation Year</label>
                  <input type="text" className="form-control" value={profile?.graduation_year || 'Not specified'} readOnly />
                </div>
              </div>
              
              <div className="mb-3">
                <label className="form-label fw-semibold">Member Since</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={profile?.created_at ? new Date(profile.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : 'N/A'} 
                  readOnly 
                />
              </div>
              
              <div className="alert alert-info mt-4">
                <i className="bi bi-info-circle me-2"></i>
                Profile editing feature will be available in the next update. Currently, your profile information is view-only.
              </div>
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className="card shadow-sm mt-3">
            <div className="card-header bg-light">
              <h6 className="mb-0">
                <i className="bi bi-activity me-2"></i>
                Recent Activity
              </h6>
            </div>
            <div className="card-body">
              <div className="text-center text-muted py-4">
                <i className="bi bi-clock-history display-4 text-muted"></i>
                <p className="mt-3 mb-1">Your recent activity will appear here</p>
                <small>Take aptitude tests and complete roadmaps to see your progress!</small>
                <div className="mt-3">
                  <a href="/aptitude" className="btn btn-primary btn-sm">
                    <i className="bi bi-play-circle me-1"></i>
                    Start a Test
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;