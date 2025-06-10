const mongoose = require('mongoose');
const { blogSchema, userSchema, commentSchema } = require('../database/models');
const Blog = mongoose.model('blogs', blogSchema);
const comments = mongoose.model('comments', commentSchema);
const cardOverview = async (req, res) => {
  let id = req.query.id;
  const message = req.query.msg || '';
  const author = req.session.user
    ? req.session.user.firstName + ' ' + req.session.user.lastName
    : null;
  const isLoggedIn = !!req.session.user;
  const blogWait = await Blog.findById(id);
  if (!blogWait) {
    return res.status(404).render('404');
  }
  const comment = await comments
    .find({ postId: blogWait._id })
    .populate('createdBy');
  let metaDescription = blogWait.description || '';
  if (metaDescription.length > 80) {
    metaDescription = metaDescription.substring(0, 80) + '...';
  } else if (metaDescription.length === 0) {
    metaDescription = 'No description available';
  }
  res.status(200).render('productPage', {
    productName: blogWait.title,
    productDetails: blogWait.description,
    productMetaDescription: metaDescription,
    productImage: blogWait.image || 'default.png',
    productId: blogWait._id,
    isAuthor: blogWait.author === author,
    isLoggedIn,
    hiddenMessage: message,
    comments: comment,
    ID: req.query.id,
  });
};

module.exports = cardOverview;
