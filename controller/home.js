const path = require('path');
const { default: mongoose } = require('mongoose');
const ejs = require('ejs');
const fs = require('fs');
const { blogSchema } = require('../database/models');
const Blog = mongoose.model('blogs', blogSchema);

const home = async (req, res) => {
  const blogs = await Blog.find();
  const message = req.query.msg || '';
  console.log(req.session.user._id);

  const isLoggedIn = req.session.user ? true : false;

  const cardTemplate = fs.readFileSync(
    path.join(__dirname, '..', 'public', 'templates', 'tempOverview.ejs'),
    'utf-8'
  );
  const productCards = blogs
    .map((product) =>
      ejs.render(cardTemplate, {
        image: product.image || 'default.png',
        productName: product.title,
        id: String(product._id),
        shortDescription: product.description
          ? product.description.slice(0, 120) +
            (product.description.length > 120 ? '...' : '')
          : '',
      })
    )
    .join('');

  res.render('home', {
    productCards,
    hiddenMessage: message,
    isLoggedIn,
  });
};

module.exports = home;
