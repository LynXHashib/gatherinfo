const express = require('express');
const { signUp, login } = require('../controller/sign');
const router = express.Router();
router.route('/signup').get(signUp).post(signUp);
router.route('/login').get(login).post(login);
module.exports = router;
