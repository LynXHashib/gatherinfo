const path = require('path');
const { blogSchema } = require('../database/models');
const { default: mongoose } = require('mongoose');
const { title } = require('process');
const Blog = mongoose.model('blogs', blogSchema);

const postCard = async (req, res) => {
  if (req.method === 'POST') {
    const { description, title, image } = req.body;
    const author = req.session.user.firstName + ' ' + req.session.user.lastName;

    if (!description || !title) {
      res.status(400).redirect('/?msg=Post+creation+failed');
    } else {
      await Blog.create({ author, title, description, image });
      return res.redirect('/?msg=Post+created+successfully!');
    }
  } else {
    if (req.query.id) {
      const editing = await Blog.findById(req.query.id);

      return res.render('post', {
        POST: 'edit',
        ID: req.query.id,
        VALUE: editing.description || '',
        TITLE: editing.title || '',
        IMAGE: editing.image || 'default.png',
      });
    }
    res.render('post', {
      VALUE: '',
      TITLE: '',
      IMAGE: 'default.png',
      POST: '',
      ID: '',
    });
  }
};
const postEdit = async (req, res) => {
  const id = req.query.id;
  console.log(id);

  const author = req.session.user.firstName + ' ' + req.session.user.lastName;
  if (!req.session.user) return res.redirect('/');
  const { description, title, image } = req.body;
  if (!description || !title) {
    return res.status(400).redirect('/?msg=Post+edit+failed');
  }
  await Blog.updateOne(
    { _id: id, author: author },
    { title, description, image }
  );
  res.status(201).redirect('/?msg=Post+edited+Successfully');
};
const postDelete = async (req, res) => {
  const id = req.query.id;
  const author = req.session.user.firstName + ' ' + req.session.user.lastName;
  await Blog.deleteOne({ _id: id, author: author });
  res.redirect('/?msg=Post+Deleted');
};
module.exports = { postCard, postEdit, postDelete };
