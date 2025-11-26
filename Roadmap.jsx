import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Roadmap = () => {
  const [domain, setDomain] = useState('Programming');
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    fetchRoadmap();
  }, [domain]);

  const fetchRoadmap = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/roadmap/${domain}`);
      setRoadmap(response.data);
      // Initialize completed steps (in real app, this would come from backend)
      setCompletedSteps([]);
    } catch (error) {
      console.error('Error fetching roadmap:', error);
      setRoadmap(null);
    }
    setLoading(false);
  };

  const toggleStepCompletion = (stepIndex) => {
    setCompletedSteps(prev => 
      prev.includes(stepIndex)
        ? prev.filter(index => index !== stepIndex)
        : [...prev, stepIndex]
    );
  };

  const getDomainIcon = (domain) => {
    switch (domain) {
      case 'Programming': return 'bi-code-slash';
      case 'Quantitative': return 'bi-calculator';
      case 'Logical': return 'bi-puzzle';
      default: return 'bi-map';
    }
  };

  const getDomainColor = (domain) => {
    switch (domain) {
      case 'Programming': return 'primary';
      case 'Quantitative': return 'success';
      case 'Logical': return 'info';
      default: return 'secondary';
    }
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading roadmap...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3">
          {/* Domain Selection Card */}
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h6 className="mb-0">
                <i className="bi bi-compass me-2"></i>
                Learning Paths
              </h6>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label fw-semibold">Select Domain</label>
                <select 
                  className="form-select"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                >
                  <option value="Programming">Programming & Coding</option>
                  <option value="Quantitative">Quantitative Aptitude</option>
                  <option value="Logical">Logical Reasoning</option>
                </select>
              </div>
              
              <div className="mt-4">
                <h6 className="text-muted mb-3">Quick Stats</h6>
                <div className="d-flex justify-content-between mb-2">
                  <span>Steps Completed:</span>
                  <strong>{completedSteps.length}</strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Total Steps:</span>
                  <strong>{roadmap?.steps ? JSON.parse(roadmap.steps).length : 0}</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Progress:</span>
                  <strong>
                    {roadmap?.steps ? 
                      Math.round((completedSteps.length / JSON.parse(roadmap.steps).length) * 100) : 0
                    }%
                  </strong>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tips Card */}
          <div className="card shadow-sm mt-3">
            <div className="card-header bg-light">
              <h6 className="mb-0">
                <i className="bi bi-lightbulb me-2"></i>
                Study Tips
              </h6>
            </div>
            <div className="card-body">
              <ul className="list-unstyled small">
                <li className="mb-2">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  Follow steps in order
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  Practice regularly
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  Take notes
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  Build projects
                </li>
                <li className="mb-0">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  Review regularly
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="col-md-9">
          {roadmap ? (
            <div className="card shadow-sm">
              <div className={`card-header bg-${getDomainColor(domain)} text-white`}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h4 className="mb-1">
                      <i className={`${getDomainIcon(domain)} me-2`}></i>
                      {roadmap.title}
                    </h4>
                    <p className="mb-0 opacity-75">{roadmap.description}</p>
                  </div>
                  <div className="text-end">
                    <div className="badge bg-light text-dark fs-6">
                      {completedSteps.length}/{roadmap.steps ? JSON.parse(roadmap.steps).length : 0} Completed
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="card-body">
                <div className="roadmap-progress mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-muted">Overall Progress</span>
                    <span className="fw-semibold">
                      {roadmap.steps ? 
                        Math.round((completedSteps.length / JSON.parse(roadmap.steps).length) * 100) : 0
                      }%
                    </span>
                  </div>
                  <div className="progress" style={{ height: '8px' }}>
                    <div 
                      className="progress-bar bg-success" 
                      style={{ 
                        width: `${roadmap.steps ? 
                          (completedSteps.length / JSON.parse(roadmap.steps).length) * 100 : 0
                        }%` 
                      }}
                    ></div>
                  </div>
                </div>

                <div className="roadmap-steps">
                  {roadmap.steps && JSON.parse(roadmap.steps).map((step, index) => (
                    <div key={index} className="roadmap-step mb-4">
                      <div className="d-flex">
                        <div className="step-number me-3">
                          <div 
                            className={`rounded-circle d-flex align-items-center justify-content-center ${
                              completedSteps.includes(index) 
                                ? 'bg-success text-white' 
                                : 'bg-light text-dark border'
                            }`}
                            style={{ 
                              width: '50px', 
                              height: '50px', 
                              cursor: 'pointer',
                              transition: 'all 0.3s ease'
                            }}
                            onClick={() => toggleStepCompletion(index)}
                            title={completedSteps.includes(index) ? 'Mark as incomplete' : 'Mark as complete'}
                          >
                            {completedSteps.includes(index) ? (
                              <i className="bi bi-check-lg fs-5"></i>
                            ) : (
                              <span className="fw-bold">{index + 1}</span>
                            )}
                          </div>
                        </div>
                        
                        <div className="step-content flex-grow-1">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <h5 className="mb-1">{step}</h5>
                            <span className={`badge ${
                              completedSteps.includes(index) 
                                ? 'bg-success' 
                                : 'bg-secondary'
                            }`}>
                              {completedSteps.includes(index) ? 'Completed' : 'Pending'}
                            </span>
                          </div>
                          
                          <div className="progress mb-2" style={{ height: '6px' }}>
                            <div 
                              className={`progress-bar ${
                                completedSteps.includes(index) 
                                  ? 'bg-success' 
                                  : 'bg-warning'
                              }`} 
                              style={{ width: completedSteps.includes(index) ? '100%' : '0%' }}
                            ></div>
                          </div>
                          
                          <div className="step-actions mt-2">
                            <small className="text-muted">
                              {completedSteps.includes(index) ? (
                                <span className="text-success">
                                  <i className="bi bi-check-circle me-1"></i>
                                  Completed on {new Date().toLocaleDateString()}
                                </span>
                              ) : (
                                'Click the circle to mark as complete'
                              )}
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Roadmap Visualization Placeholder */}
                {roadmap.image_path && (
                  <div className="text-center mt-5 p-4 bg-light rounded">
                    <i className="bi bi-diagram-3 display-1 text-muted"></i>
                    <h5 className="mt-3">Roadmap Visualization</h5>
                    <p className="text-muted">
                      Interactive roadmap visualization would be displayed here.
                    </p>
                    <small className="text-muted">
                      Image reference: {roadmap.image_path}
                    </small>
                  </div>
                )}
              </div>
              
              <div className="card-footer bg-light">
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">
                    Last updated: {roadmap.created_at ? new Date(roadmap.created_at).toLocaleDateString() : 'Recently'}
                  </small>
                  <button 
                    className="btn btn-outline-primary btn-sm"
                    onClick={fetchRoadmap}
                  >
                    <i className="bi bi-arrow-clockwise me-1"></i>
                    Refresh
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="card shadow-sm">
              <div className="card-body text-center py-5">
                <i className="bi bi-map display-1 text-muted"></i>
                <h4 className="mt-3">Roadmap Not Available</h4>
                <p className="text-muted mb-4">
                  We couldn't find a roadmap for {domain}. Please try another domain or check back later.
                </p>
                <button className="btn btn-primary" onClick={fetchRoadmap}>
                  <i className="bi bi-arrow-repeat me-2"></i>
                  Try Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;