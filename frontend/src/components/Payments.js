import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import axios from 'axios';

const Payments = ({ payments }) => {
  const markAsPaid = async (paymentId) => {
    try {
      await axios.patch(`http://localhost:4000/api/payments/${paymentId}/mark-as-paid`, { status: 'paid' }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('Payment marked as paid!');
    } catch (error) {
      console.error("Error marking payment as paid:", error);
    }
  };

  return (
    <div className="my-5">
      <h3>Payments</h3>
      <ListGroup>
        {payments.map((payment) => (
          <ListGroup.Item key={payment._id} className="d-flex justify-content-between align-items-center">
            {payment.amount} - {payment.status}
            {payment.status === 'unpaid' && (
              <Button variant="success" onClick={() => markAsPaid(payment._id)}>
                Mark as Paid
              </Button>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Payments;
