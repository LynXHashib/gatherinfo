const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const blogSchema = new mongoose.Schema({
  id: ObjectId,
  author: {
    type: String,
    required: true,
  },
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
  },
  date: Date,
});
const userSchema = new mongoose.Schema(
  {
    id: ObjectId,
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = { blogSchema, userSchema };
