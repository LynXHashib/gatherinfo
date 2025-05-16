const fs = require('fs');
const Analytics = require('@vercel/analytics');
const express = require('express');
const path = require('path');
const contacts = require('./routes/contactRoute');
const cardRoute = require('./routes/cardRoute');
const app = express();
app.use(express.static(`${__dirname}/public`));
const home = require('./routes/homeRoute');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', home);
app.use('/info', cardRoute);
app.use('/api/contacts', contacts);
app.use((req, res) => {
  console.log('Error');

  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

module.exports = app;
