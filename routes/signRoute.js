const express = require('express');
const { signUp, login, logout } = require('../controller/sign');
const router = express.Router();
router.route('/signup').get(signUp).post(signUp);
router.route('/login').get(login).post(login);
router.route('/logout').get(logout).post(logout);
module.exports = router;
