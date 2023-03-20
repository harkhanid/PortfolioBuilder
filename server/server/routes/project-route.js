const express = require('express');
const router = express.Router();

const projectController = require('../controllers/project-controller');

router.route('/portfolio/:portfolio_id/project/:project_id')
    .get(projectController.getProject)
    .delete(projectController.deleteProject)
    .put(projectController.updateProject);

router.route('/portfolio/:portfolio_id/project')
    .post(projectController.createProject)
    .get(projectController.getAllProjects);

    
module.exports = router;