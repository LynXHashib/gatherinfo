const path = require('path');
const postHtml = path.join(__dirname, '../public/templates/post.html');
const { blogSchema, userSchema } = require('../database/models');
const { default: mongoose } = require('mongoose');

const Blog = mongoose.model('blogs', blogSchema);
const postCard = async (req, res) => {
  if (req.method === 'POST') {
    const description = req.body.description;
    const title = req.body.title;
    const image = req.body.image;
    if (!description || !title || !image) {
      res.status(400).redirect('/?msg=Post+creation+failed');
    } else {
      await Blog.create({
        title: title,
        description: description,
        image: image,
      });
      return res.redirect('/?msg=Post+created+successfully!');
    }
  } else {
    res.sendFile(postHtml);
  }
};

module.exports = postCard;
