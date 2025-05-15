const fs = require("fs");
const express = require("express");
const path = require("path");
const contacts = require("./routes/contactRoute");
const app = express();
app.use(express.static(`${__dirname}/public`));
const home = require("./routes/homeRoute");

app.use(express.static(path.join(__dirname, "public")));

app.use("/", home);
app.use("/api/contacts", contacts);
module.exports = app;
