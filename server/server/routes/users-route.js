const express = require('express');
const router = express.Router();

const userController = require('../controllers/user-controller');

router.route('/user')
    .post(userController.create);

router.route('/user/self')
    .get(userController.getUser);

router.route('/login')
    .post(userController.login);
    
module.exports = router;