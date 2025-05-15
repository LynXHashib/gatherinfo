const fs = require('fs');
const path = require('path');
const data = fs.readFileSync(
  path.join(__dirname, '..', 'database', 'cards.json'),
  'utf-8'
);
const dataObj = JSON.parse(data);

const productPage = fs.readFileSync(
  path.join(__dirname, '..', 'public', 'templates', 'productPage.html'),
  'utf-8'
);

const replaceTemplate = (template, product) => {
  let output = template;
  output = output.replace(/{%PRODUCT_NAME%}/g, product.name);
  output = output.replace(/{%PRODUCT_DETAILS%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);
  output = output.replace(/{%PRODUCT_IMAGE%}/g, product.image || 'default.png');
  return output;
};

const cardOverview = (req, res) => {
  const id = req.query.id;
  const product = dataObj.find((el) => el.id === id);

  if (!product) {
    return res.status(404).send('Product not found');
  }

  const output = replaceTemplate(productPage, product);
  res.status(200).send(output);
};

module.exports = cardOverview;
