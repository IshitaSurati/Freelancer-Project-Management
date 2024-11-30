const Payment = require('../models/payment');
const Project = require('../models/project');
const { parse } = require('json2csv');

// Create a payment
const createPayment = async (req, res) => {
  const { projectId, amount } = req.body;

  try {
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(400).json({ message: 'Project not found' });
    }

    const newPayment = new Payment({
      projectId,
      amount,
    });

    await newPayment.save();
    res.status(201).json(newPayment);
  } catch (error) {
    res.status(400).json({ message: 'Error creating payment', error });
  }
};

// Get all payments
const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate('projectId');
    res.json(payments);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching payments', error });
  }
};

// Mark payment as paid
const markAsPaid = async (req, res) => {
  const { paymentId } = req.params;

  try {
    const payment = await Payment.findById(paymentId);

    if (!payment) {
      return res.status(400).json({ message: 'Payment not found' });
    }

    payment.status = 'paid';
    await payment.save();
    res.json(payment);
  } catch (error) {
    res.status(400).json({ message: 'Error marking payment as paid', error });
  }
};
const exportPaymentsToCSV = async (req, res) => {
    try {
      const payments = await Payment.find().populate('projectId');
      const csv = parse(payments);
      res.header('Content-Type', 'text/csv');
      res.attachment('payments.csv');
      res.send(csv);
    } catch (error) {
      res.status(400).json({ message: 'Error exporting payments', error });
    }
  };

module.exports = {
  createPayment,
  getPayments,
  markAsPaid,
  exportPaymentsToCSV
};
