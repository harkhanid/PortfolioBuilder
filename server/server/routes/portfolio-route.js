const express = require('express');
const router = express.Router();

const portfolioController = require('../controllers/portfolio-controller');

router.route('/portfolio')
    .get(portfolioController.getPortfolio);

router.route('/portfolio/:portfolio_id')
    .put(portfolioController.updatePortfolio);    

module.exports = router;