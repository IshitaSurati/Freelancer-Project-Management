import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Project Dashboard</h2>
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/add-project">Add Project</Link></li>
        <li><Link to="/payment">Payment</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
