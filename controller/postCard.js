const path = require('path');
const postHtml = path.join(__dirname, '../public/templates/post.html');
const { blogPost, users } = require('../database/models');
const { default: mongoose } = require('mongoose');

const Blog = mongoose.model('blogs', blogPost);
const postCard = async (req, res) => {
  if (req.method === 'POST') {
    const description = req.body.description;
    const title = req.body.title;
    const image = req.body.image;
    if (!description || !title || !image) {
      console.log('No input');
      res.status(400).send('No input');
    } else {
      await Blog.create({
        title: title,
        description: description,
        image: image,
      });
      res.status(201).send('Success');
    }
  } else {
    res.sendFile(postHtml);
  }
};

module.exports = postCard;
