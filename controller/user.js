const mongoose = require('mongoose');
const { userSchema } = require('../database/models');
const userDB = mongoose.model('users', userSchema);
const userProfile = async (req, res) => {
  const id = req.session.user._id;
  const userList = await userDB.find();
  const user = await userDB.findById(id);
  res.render('user', {
    user,
  });
};
const userDescriptionEdit = async (req, res) => {
  const id = req.session.user._id;
  const user = await userDB.find(id);
  const userInfo = req.body;
  user.userinfo = userInfo;
  res.render('user', {
    user,
  });
};
module.exports = { userProfile, userDescriptionEdit };
