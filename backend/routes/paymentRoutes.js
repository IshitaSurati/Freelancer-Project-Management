const express = require('express');
const router = express.Router();
const Payment = require('../models/paymentModel'); 
const Project = require('../models/projectModel'); 

// Endpoint to handle payments
router.post('/', async (req, res) => {
  const { projectId, amount } = req.body;

  try {
    // Find the project
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Assuming you handle payment logic here (e.g., interacting with payment gateway)
    // Mark the project as 'paid'
    project.status = 'paid';
    await project.save();

    // Log payment (for demo purposes, could interact with a payment service)
    const payment = new Payment({
      projectId,
      amount,
      date: new Date(),
    });
    await payment.save();

    // Return success response
    res.status(200).json({ message: 'Payment processed successfully', project });
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

module.exports = router;
