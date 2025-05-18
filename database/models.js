const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;
const blogPost = new mongoose.Schema({
  id: ObjectId,
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  date: Date,
});
const users = new mongoose.Schema(
  {
    id: ObjectId,
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);
module.exports = { blogPost, users };
