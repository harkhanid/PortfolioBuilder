const express = require('express');
const router = express.Router();

const fileController = require('../controllers/file-controller');
const feedbackController = require('../controllers/feedback-controller');
router.route('/file')
    .post(fileController.uploadFile);

router.route('/file/:fileId')
    .get(fileController.getFile);


router.route('/feedback')
    .post(feedbackController.createFeedBack);
module.exports = router;