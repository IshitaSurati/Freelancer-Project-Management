const Project = require('../models/project.js');

// Create new project
const createProject = async (req, res) => {
  const { name, dueDate, status } = req.body;

  try {
    const newProject = new Project({ name, dueDate, status, userId: req.userId });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ message: 'Error creating project', error });
  }
};

// Get all projects for authenticated user
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.userId });
    res.json(projects);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching projects', error });
  }
};

module.exports = {
  createProject,
  getProjects,
};
