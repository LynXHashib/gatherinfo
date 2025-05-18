const app = require('./index');

if (require.main === module) {
  const dotenv = require('dotenv').config();
  const PORT = process.env.PORT || 2001;
  app.listen(PORT, () => {
    console.log(`Server is Running at http://localhost:${PORT}`);
  });
}

module.exports = app;
