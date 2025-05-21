const mongoose = require('mongoose');
const { blogSchema } = require('../database/models');
const Blog = mongoose.model('blogs', blogSchema);

const cardOverview = async (req, res) => {
  const id = req.query.id;
  const author = req.session.user
    ? req.session.user.firstName + ' ' + req.session.user.lastName
    : null;
  const blogWait = await Blog.findById(id);
  if (!blogWait) {
    return res.status(404).render('404');
  }
  res.status(200).render('productPage', {
    productName: blogWait.title,
    productDetails: blogWait.description,
    productImage: blogWait.image || 'default.png',
    productId: blogWait._id,
    isAuthor: blogWait.author === author,
  });
};

module.exports = cardOverview;
