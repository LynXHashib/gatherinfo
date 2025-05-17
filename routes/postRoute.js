const express = require('express');
const postCard = require('../controller/postCard');
const router = express.Router();
router.route('/').get(postCard).post(postCard);
module.exports = router;
