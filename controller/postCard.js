const path = require('path');
const { blogSchema } = require('../database/models');
const { default: mongoose } = require('mongoose');
const Blog = mongoose.model('blogs', blogSchema);

const postCard = async (req, res) => {
  if (req.method === 'POST') {
    const { description, title, image } = req.body;
    if (!description || !title || !image) {
      res.status(400).redirect('/?msg=Post+creation+failed');
    } else {
      await Blog.create({ title, description, image });
      return res.redirect('/?msg=Post+created+successfully!');
    }
  } else {
    res.render('post');
  }
};

module.exports = postCard;
