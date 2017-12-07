'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  name: String,
  description: String,
  experienceLevel: String
});

const User = mongoose.model('User', userSchema);

module.exports = {
  User
};
