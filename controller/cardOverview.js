const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const { blogPost, users } = require('../database/models');

const blog = mongoose.model('blogs', blogPost);

const productPage = fs.readFileSync(
  path.join(__dirname, '..', 'public', 'templates', 'productPage.html'),
  'utf-8'
);
const ObjectId = mongoose.Schema.ObjectId;

const replaceTemplate = (template, product) => {
  let output = template;
  output = output.replace(/{%PRODUCT_NAME%}/g, product.title);
  output = output.replace(/{%PRODUCT_DETAILS%}/g, product.description);
  output = output.replace(/{%ID%}/g, String(product._id));
  output = output.replace(/{%PRODUCT_IMAGE%}/g, product.image || 'default.png');
  return output;
};

const cardOverview = async (req, res) => {
  const id = req.query.id;
  console.log(id);
  console.log(req.url);
  const blogWait = await blog.findById(id);
  // console.log('blogWait:', blogWait);
  // console.log('blogWait._id:', blogWait._id);
  if (!blogWait) {
    return res.status(404).send('Product not found');
  }

  const output = replaceTemplate(productPage, blogWait);
  res.status(200).send(output);
};

module.exports = cardOverview;
