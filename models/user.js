'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

  username: String,
  password: String,
  name: String,
  description: String,
  experienceLevel: {
    type: String,
    enum: ['Beginner', 'Advanced Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  }
});
// userSchema.index({ location: '2dsphere' });

const User = mongoose.model('User', userSchema);

module.exports = {
  User
};
