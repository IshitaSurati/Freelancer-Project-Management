import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [earnings, setEarnings] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/projects')
      .then(response => setProjects(response.data))
      .catch(error => console.error(error));

    // Fetch earnings (example, you can replace with actual logic)
    setEarnings(1000);
  }, []);

  const handleDelete = (projectId) => {
    axios.delete(`http://localhost:5000/api/projects/${projectId}`)
      .then(() => {
        alert('Project deleted successfully!');
        setProjects(projects.filter(project => project._id !== projectId));
      })
      .catch((error) => {
        console.error('Error deleting project:', error);
        alert('Error deleting project');
      });
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="earnings">
        <h3>Total Earnings: ${earnings}</h3>
        <div className="chart">
          {/* Add chart or graph here */}
        </div>
      </div>
      <div className="projects">
        {projects.map(project => (
          <div key={project._id} className="project-card">
            <h4>{project.name}</h4>
            <p>Due: {new Date(project.dueDate).toLocaleDateString()}</p>
            <p>Status: {project.status}</p>
            <button onClick={() => navigate(`/edit-project/${project._id}`)}>Edit</button>
            <button onClick={() => handleDelete(project._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
