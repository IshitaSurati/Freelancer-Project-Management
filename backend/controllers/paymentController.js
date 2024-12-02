const Payment = require('../models/paymentModel');

// Get all payments
const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate('projectId'); // Assuming you want to populate project details
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payments', error });
  }
};

// Mark payment as paid
const markPaymentAsPaid = async (req, res) => {
  const { id } = req.params;

  try {
    const payment = await Payment.findById(id);
    
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    // Update payment status to 'paid'
    payment.status = 'paid';
    await payment.save();

    res.status(200).json({ message: 'Payment marked as paid', payment });
  } catch (error) {
    res.status(500).json({ message: 'Error updating payment status', error });
  }
};

// Create a new payment
const createPayment = async (req, res) => {
  const { projectId, amount } = req.body;

  try {
    const newPayment = new Payment({
      projectId,
      amount,
      status: 'pending', // Default status is 'pending'
    });

    await newPayment.save();
    res.status(201).json({ message: 'Payment created successfully', newPayment });
  } catch (error) {
    res.status(500).json({ message: 'Error creating payment', error });
  }
};

module.exports = { getPayments, markPaymentAsPaid, createPayment };
