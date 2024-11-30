import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from './components/Dashboard';
import ProjectForm from './components/ProjectForm';
import Payments from './components/Payments';
import CSVImport from './components/CSVImport';
import './App.css';

const App = () => {
  const [projects, setProjects] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchProjects();
    fetchPayments();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/projects');
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchPayments = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/payments');
      setPayments(response.data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  return (
    <div className="container">
      <header className="my-4">
        <h1 className="text-center">Project Management Dashboard</h1>
      </header>
      <ProjectForm onAddProject={fetchProjects} />
      <Dashboard projects={projects} />
      <Payments payments={payments} />
      <CSVImport />
    </div>
  );
};

export default App;
