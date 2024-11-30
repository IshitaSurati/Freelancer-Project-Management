const express = require('express');
const router = express.Router();
const { createProject, getProjects } = require('../controllers/projectController');
const authenticate = require('../middlewares/auth');

// Get all projects
router.get('/', authenticate, getProjects);

// Create new project
router.post('/', authenticate, createProject);

module.exports = router;
