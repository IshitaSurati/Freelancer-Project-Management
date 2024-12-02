import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentComponent = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // To hold the error message

  // Fetch projects and payments on component mount
  useEffect(() => {
    axios.get('http://localhost:5000/api/payments')
      .then(response => {
        setProjects(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching payments!", error);
        setError("Error fetching payments.");
        setLoading(false);
      });
  }, []);

  const handlePayment = (project, event) => {
    event.stopPropagation(); // Prevent the click event from opening the modal

    const { _id, name, amount } = project;

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
        console.error("There was an error processing the payment!", error);
        alert('Payment error: ' + (error.response ? error.response.data.message : error.message));
      });
  };

  return (
    <div>
      <h2>Payments Dashboard</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {projects.map((project) => (
            <div key={project._id} className="project-card">
              <h3>{project.name}</h3>
              <p>Amount: ${project.amount}</p>
              <p>Status: {project.status}</p>
              {project.status !== 'paid' && (
                <button onClick={(e) => handlePayment(project, e)}>Pay</button>
              )}
            </div>
          ))}
        </div>
      )}

      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default PaymentComponent;
