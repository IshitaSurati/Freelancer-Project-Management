const mongoose = require('mongoose');

// Payment Schema
const paymentSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['paid', 'unpaid'],
    default: 'unpaid',
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.Payment || mongoose.model('Payment', paymentSchema);
