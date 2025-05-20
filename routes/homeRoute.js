const express = require('express');
const home = require('../controller/home');
const { authCheck } = require('../middlewares/restriction');
const router = express.Router();

router.route('/').get(home);
module.exports = router;
