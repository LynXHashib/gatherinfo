const { default: mongoose } = require('mongoose');
const { userSchema } = require('../database/models');
const users = mongoose.model('users', userSchema);
const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const signUp = async (req, res) => {
  if (req.method == 'POST') {
    if (!req.body.firstName || !req.body.email || !req.body.password) {
      return res.status(400).redirect('/?msg=SignUp+failed');
    }
    const user = await users.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName || '',
      email: req.body.email,
      password: req.body.password,
      userinfo: 'Its empty',
    });
    req.session.user = user;
    // NODEMAILER
    //   const mailOptions = {
    //   from: process.env.EMAIL_USER,
    //   to: req.body.email,
    //   subject: 'Test Email from Nodemailer',
    //   text: 'Hello! This is a test email sent using Nodemailer.',
    //   };
    //   transporter.sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //     return console.log('Error:', error);
    //   }
    //   console.log('Email sent:', info.response);
    //    });
    return res.status(201).redirect('/?msg=Signed+UP+successfully!');
  } else {
    res.status(200).render('signup');
  }
};

const login = async (req, res) => {
  if (req.method == 'POST') {
    if (!req.body.email || !req.body.password) {
      return res.status(400).redirect('/?msg=Login+failed');
    }
    const user = await users.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (!user) {
      return res.status(400).redirect('/?msg=Login+failed');
    }
    req.session.user = user;
    return res.status(201).redirect('/?msg=Login+Successful');
  } else {
    res.status(200).render('login');
  }
};
const logout = async (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.redirect('/?msg=Logout+Successful');
  });
};
module.exports = { signUp, login, logout };
