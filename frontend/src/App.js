import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from '../src/components/Dashboard';
import ProjectForm from '../src/components/ProjectForm';
import Sidebar from '../src/components/Sidebar';
import PaymentSection from '../src/components/PaymentSection';
import ProjectEditForm from '../src/components/ProjectEditForm';

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
