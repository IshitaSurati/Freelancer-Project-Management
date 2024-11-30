const mongoose = require('mongoose');

// Project Schema
const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'completed'],
    default: 'active',
  },
});


module.exports = mongoose.models.Project || mongoose.model('Project', projectSchema);
