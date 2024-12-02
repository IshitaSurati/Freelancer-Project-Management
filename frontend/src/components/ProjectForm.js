import React, { useState } from 'react';
import axios from 'axios';

const ProjectForm = () => {
  const [name, setName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('active');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProject = { name, dueDate, status, amount };

    axios.post('http://localhost:5000/api/projects', newProject)
      .then(response => {
        alert('Project added successfully!');
        setName('');
        setDueDate('');
        setStatus('active');
        setAmount('');
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="form-container">
      <h3>Add New Project</h3>
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
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit">Add Project</button>
      </form>
    </div>
  );
};

export default ProjectForm;
