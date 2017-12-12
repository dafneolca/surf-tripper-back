'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  experienceLevel: String,
  description: String,
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
    email: this.email,
    experienceLevel: this.experienceLevel,
    description: this.description
  };
};

const User = mongoose.model('User', userSchema);

module.exports = {
  User
};
