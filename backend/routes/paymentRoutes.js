const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.get('/payments', paymentController.getPayments);
router.put('/payments/:id', paymentController.markPaymentAsPaid);

module.exports = router;
