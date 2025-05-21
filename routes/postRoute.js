const express = require('express');
const { postCard, postEdit, postDelete } = require('../controller/postCard');
const router = express.Router();
router.route('/').get(postCard).post(postCard);
router.route('/edit').get(postCard).post(postEdit);
module.exports = router;
