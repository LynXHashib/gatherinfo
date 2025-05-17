const path = require('path');
const error404 = (req, res) => {
  console.log('Error');

  res
    .status(404)
    .sendFile(path.join(__dirname, '..', 'public', 'templates', '404.html'));
};
module.exports = error404;
