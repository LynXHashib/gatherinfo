const express = require('express');
const cardOverview = require('../controller/cardOverview.js');
const router = express.Router();

router.route('/').get(cardOverview);
module.exports = router;
