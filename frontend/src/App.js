import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ProjectForm from './components/ProjectForm';
import Sidebar from './components/Sidebar';
import PaymentSection from './components/PaymentSection';
import ProjectEditForm from './components/ProjectEditForm';

const App = () => {
  return (
    <Router>
      <div className="wrapper">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-project" element={<ProjectForm />} />
            <Route path="/payment" element={<PaymentSection />} />
            <Route path="/edit-project/:id" element={<ProjectEditForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
