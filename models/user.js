'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  experienceLevel: String,
  userDescription: String,
  email: String,
  password: String
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

userSchema.methods.asData = function () {
  return {
    id: this._id,
    username: this.username,
    experienceLevel: this.experienceLevel,
    userDescription: this.userDescription,
    email: this.email,
    password: this.password,
    tripsAttending: this.tripsAttending

  };
};

const User = mongoose.model('User', userSchema);

module.exports = {
  User
};
