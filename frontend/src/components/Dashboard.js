import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch projects data from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/projects')
      .then(response => setProjects(response.data))
      .catch(error => console.error('Error fetching projects:', error));
  }, []);

  // Open the edit modal for a selected project
  const openModal = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  // Handle project updates
  const handleUpdate = () => {
    const { _id, name, dueDate, amount, status } = selectedProject;
    axios.put(`http://localhost:5000/api/projects/${_id}`, { name, dueDate, amount, status })
      .then(response => {
        alert('Project updated successfully!');
        setShowModal(false);
        setProjects(projects.map(project => 
          project._id === _id ? response.data : project
        ));
      })
      .catch(error => alert('Error updating project:', error));
  };

  // Handle project deletion
  const handleDelete = () => {
    axios.delete(`http://localhost:5000/api/projects/${selectedProject._id}`)
      .then(() => {
        alert('Project deleted successfully!');
        setShowModal(false);
        setProjects(projects.filter(project => project._id !== selectedProject._id));
      })
      .catch(error => alert('Error deleting project:', error));
  };

  // Handle payment processing
  const handlePayment = (project, event) => {
    event.stopPropagation(); // Prevent the click event from opening the modal
    const { _id, name, amount } = project;

    // Log request payload to debug
    console.log({ projectId: _id, amount });

    // Sending payment data to the backend
    axios.post('http://localhost:5000/api/payments', { projectId: _id, amount })
      .then(response => {
        alert('Payment processed successfully!');
        // Update the UI accordingly (e.g., show the paid status)
        setProjects(projects.map(p => 
          p._id === _id ? { ...p, status: 'paid' } : p
        ));
      })
      .catch(error => {
        // Improved error handling with better feedback
        console.error("Payment error:", error);
        alert('Payment error: ' + (error.response ? error.response.data.message : error.message));
      });
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="projects">
        {projects.map(project => (
          <div key={project._id} className="project-card" onClick={() => openModal(project)}>
            <h4>{project.name}</h4>
            <p>Due: {new Date(project.dueDate).toLocaleDateString()}</p>
            <p>Status: {project.status}</p>
            <p>Amount: ${project.amount}</p>
            <button onClick={(e) => handlePayment(project, e)}>Pay</button>
          </div>
        ))}
      </div>

      {showModal && selectedProject && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Project</h3>
            <label>Project Name:</label>
            <input
              type="text"
              value={selectedProject.name}
              onChange={(e) => setSelectedProject({ ...selectedProject, name: e.target.value })}
            />
            <label>Due Date:</label>
            <input
              type="date"
              value={selectedProject.dueDate}
              onChange={(e) => setSelectedProject({ ...selectedProject, dueDate: e.target.value })}
            />
            <label>Status:</label>
            <select
              value={selectedProject.status}
              onChange={(e) => setSelectedProject({ ...selectedProject, status: e.target.value })}
            >
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
            <label>Amount:</label>
            <input
              type="number"
              value={selectedProject.amount}
              onChange={(e) => setSelectedProject({ ...selectedProject, amount: e.target.value })}
            />

            <div className="modal-actions">
              <button onClick={handleUpdate}>Save Changes</button>
              <button onClick={handleDelete}>Delete Project</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
