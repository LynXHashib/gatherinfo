const { default: mongoose } = require('mongoose');
const { userSchema } = require('../database/models');
const path = require('path');
const signPage = path.join(__dirname, '../public/templates/signup.html');
const loginPage = path.join(__dirname, '../public/templates/login.html');
const users = mongoose.model('users', userSchema);

const signUp = async (req, res) => {
  if (req.method == 'POST') {
    console.log(req.url);
    if (!req.body.firstName || !req.body.email || !req.body.password) {
      return res.status(400).redirect('/?msg=SignUp+failed');
    }
    const user = await users.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName || '',
      email: req.body.email,
      password: req.body.password,
    });
    const sessionID = uuidv4();
    req.session.user = user;
    return res
      .status(201)
      .cookie('uid', sessionID)
      .redirect('/?msg=Signed+UP+successfully!');
  } else {
    res.status(200).sendFile(signPage);
  }
};
const login = async (req, res) => {
  if (req.method == 'POST') {
    console.log(req.url);
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
    const sessionID = uuidv4();
    req.session.user = user;

    return res
      .status(201)
      .cookie('uid', sessionID)
      .redirect('/?msg=Login+Successful');
  } else {
    res.status(200).sendFile(loginPage);
  }
};

module.exports = { signUp, login };
