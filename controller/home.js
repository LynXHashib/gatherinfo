const path = require('path');
const fs = require('fs');
const Analytics = require('@vercel/analytics');
const { default: mongoose } = require('mongoose');
const { blogPost, users } = require('../database/models');
const Blog = mongoose.model('blogs', blogPost);
const homeTemp = fs.readFileSync(
  path.join(__dirname, '..', 'public', 'home', 'app.html'),
  'utf-8'
);
const tempCard = fs.readFileSync(
  path.join(__dirname, '..', 'public', 'templates', 'tempOverview.html'),
  'utf-8'
);

const replaceTemplate = (template, product) => {
  let output = template.replace(/{%IMAGE%}/g, product.image || 'default.png');
  output = output.replace(/{%PRODUCTNAME%}/g, product.title);
  output = output.replace(/{%QUANTITY%}/g, '');
  output = output.replace(/{%PRICE%}/g, '');
  output = output.replace(/{%ID%}/g, String(product._id));
  const shortDesc = product.description
    ? product.description.slice(0, 120) +
      (product.description.length > 120 ? '...' : '')
    : '';
  output = output.replace(/{%SHORT_DESCRIPTION%}/g, shortDesc);
  return output;
};

const home = async (req, res) => {
  console.log(req.url);
  const blogsWait = await Blog.find();
  const cardsHtml = blogsWait
    .map((el) => replaceTemplate(tempCard, el))
    .join('');
  const output = homeTemp.replace('{%PRODUCT_CARDS%}', cardsHtml);
  res.status(200).send(output);
};

module.exports = home;
