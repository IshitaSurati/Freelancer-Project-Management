const express = require('express');
const router = express.Router();
const { createPayment, getPayments, markAsPaid } = require('../controllers/paymentController');
const authenticate = require('../middlewares/auth');

// Create a new payment
router.post('/', authenticate, createPayment);

// Get all payments
router.get('/', authenticate, getPayments);

// Mark a payment as paid
router.put('/:paymentId/mark-as-paid', authenticate, markAsPaid);

module.exports = router;
