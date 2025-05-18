const app = require('./index');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 2001;

app.listen(PORT, () => {
  console.log(`Server is Running at http://localhost:${PORT}`);
});
module.exports = app;
