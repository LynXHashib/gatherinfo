const express = require('express');
const cardOverview = require('../controller/productPage.js');
const commentBox = require('../controller/comments.js');
const router = express.Router();

router.route('/').get(cardOverview);
router.route(`/comment`).post(commentBox);
module.exports = router;
