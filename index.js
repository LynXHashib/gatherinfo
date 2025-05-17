const fs = require('fs');
const Analytics = require('@vercel/analytics');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
mongoose.connect(`mongodb://127.0.0.1/database`);

//      ROUTES

const home = require('./routes/homeRoute');
const postRoute = require('./routes/postRoute');
const contacts = require('./routes/contactRoute');
const cardRoute = require('./routes/cardRoute');
const error404 = require('./controller/404');

const app = express();
app.use(express.static(`${__dirname}/public`));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//      PAGES

app.use('/', home);
app.use('/info', cardRoute);
app.use('/post', postRoute);
app.use('/api/contacts', contacts);
app.use(error404);

module.exports = app;
