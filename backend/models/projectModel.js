const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dueDate: { type: Date, required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: 'active' },
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
