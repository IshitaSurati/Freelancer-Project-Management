import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ProjectEditForm = () => {
  const [name, setName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('active');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/projects/${id}`)
      .then(response => {
        setName(response.data.name);
        setDueDate(response.data.dueDate);
        setStatus(response.data.status);
      })
      .catch(error => console.error('Error fetching project details:', error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProject = { name, dueDate, status };

    axios.put(`http://localhost:5000/api/projects/${id}`, updatedProject)
      .then(response => {
        alert('Project updated successfully!');
        navigate('/');
      })
      .catch(error => console.error('Error updating project:', error));
  };

  return (
    <div className="form-container">
      <h3>Edit Project</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
        <button type="submit">Update Project</button>
      </form>
    </div>
  );
};

export default ProjectEditForm;
