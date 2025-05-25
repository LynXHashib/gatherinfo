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
  const userInfo = req.body.description;
  await userDB.findByIdAndUpdate(id, { userinfo: userInfo });
  res.redirect('/user');
};
module.exports = { userProfile, userDescriptionEdit };
