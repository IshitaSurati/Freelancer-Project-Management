import React, { useState } from 'react';
import axios from 'axios';
import { Card, Button, Form } from 'react-bootstrap';

const ProjectForm = ({ onAddProject }) => {
  const [projectName, setProjectName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('active');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProject = { name: projectName, dueDate, status };
    
    try {
      await axios.post('http://localhost:4000/api/projects', newProject, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      onAddProject(); // Fetch updated project list
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  return (
    <Card className="shadow-sm p-4 mb-5">
      <h3>Add New Project</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="projectName">
          <Form.Label>Project Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="dueDate">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="status">
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-3 w-100">Add Project</Button>
      </Form>
    </Card>
  );
};

export default ProjectForm;
