const Analytics = require('@vercel/analytics');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { authCheck, restrictToLogin } = require('./middlewares/restriction');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const dotenv = require('dotenv').config();
const mongodb = process.env.MONGO;

//      DATABASE

mongoose
  .connect(mongodb)
  .then(() => console.log(`Connected Successfully`))
  .catch((err) => {
    console.log(`Error : `, err);
  });

//      ROUTES

const home = require('./routes/homeRoute');
const postRoute = require('./routes/postRoute');
const contacts = require('./routes/contactRoute');
const cardRoute = require('./routes/cardRoute');
const signRoute = require('./routes/signRoute');
const error404 = require('./controller/404');

//  LOG

const app = express();
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO }),
    cookie: { secure: false, maxAge: 86400000 },
  })
);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public/templates'));
app.use(express.static(`${__dirname}/public`));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(authCheck);
//      PAGES
app.use('/', home);
app.use('/info', cardRoute);
app.use('/post', restrictToLogin, postRoute);
app.use('/user', signRoute);
app.use('/api/contacts', contacts);
app.use(error404);

module.exports = app;
