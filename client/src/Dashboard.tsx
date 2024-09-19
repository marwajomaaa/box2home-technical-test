// src/Dashboard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Import the CSS file

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleProjectsClick = () => {
    navigate('/projects'); // Navigate to projects page
  };

  const handleTasksClick = () => {
    navigate('/tasks'); // Navigate to tasks page
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome to the Dashboard</h1>
      <div className="button-container">
        <button className="dashboard-button" onClick={handleProjectsClick}>
          Projects
        </button>
        <button className="dashboard-button" onClick={handleTasksClick}>
          Tasks
        </button>
      </div>
      {/* Add your dashboard content here */}
    </div>
  );
};

export default Dashboard;
