import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PaymentSection = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/payments')
      .then(response => {
        setPayments(response.data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.error('Error fetching payments:', error);
      });
  }, []);

  const handlePayment = (id) => {
    axios.put(`http://localhost:5000/api/payments/${id}`)
      .then(response => {
        alert('Payment successfully processed');
        setPayments(payments.map(payment => payment._id === id ? { ...payment, status: 'paid' } : payment));
      })
      .catch(error => console.error('Payment processing error:', error));
  };

  return (
    <div className="payment-section">
      <h3>Payments</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        payments.map(payment => (
          <div key={payment._id} className="payment-card">
            <p>Amount: ${payment.amount}</p>
            <p>Status: {payment.status}</p>
            {payment.status === 'unpaid' && (
              <button onClick={() => handlePayment(payment._id)}>Mark as Paid</button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default PaymentSection;
