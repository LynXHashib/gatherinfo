const mongoose = require('mongoose');
const { userSchema, commentSchema } = require('../database/models');
const comments = mongoose.model('comments', commentSchema);
const users = mongoose.model('users', userSchema);
const commentBox = async (req, res) => {
  const postID = req.query.id;

  const id = req.session.user._id || '';
  if (!req.session.user) {
    const { name, email, comment, password } = req.body;
    await users.create({
      firstName: name,
      email: email,
      password: password,
    });
    const user = await users.findOne({ email: email });
    await comments.create({
      createdBy: user.id,
      postId: postID,
      comment: comment,
    });
  } else {
    const { comment } = req.body;
    await comments.create({
      createdBy: id,
      postId: postID,
      comment: comment,
    });
    res.redirect(`/info?id=${postID}&?msg=Comment+Successful`);
  }
};
module.exports = commentBox;
