const Payment = require('../models/paymentModel');

exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate('projectId');
    res.status(200).json(payments);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.markPaymentAsPaid = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(req.params.id, { status: 'paid' }, { new: true });
    res.status(200).json(payment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
