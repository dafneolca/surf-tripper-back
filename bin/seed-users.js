const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bcryptSalt = 10;
const User = require('../models/user').User;
mongoose.connect('mongodb://localhost:27017/surf-tripper-back', { useMongoClient: true });

var salt = bcrypt.genSaltSync(bcryptSalt);
const password = 'ironhack';
var encryptedPass = bcrypt.hashSync(password, salt);
const user = [
  {
    username: 'Dafne',
    password: encryptedPass,
    name: 'Also Dafne',
    description: 'Wants to surf',
    experienceLevel: 'Advanced Beginner'
  },
  {
    username: 'Deniz',
    password: encryptedPass,
    name: 'Dafne Deniz',
    description: 'Wants to surf with Dafne',
    experienceLevel: 'Advanced'
  }
];

User.create(user, (err, user) => {
  if (err) {
    throw err;
  }
  user.forEach((user) => {
    console.log('Success', user);
  });
  mongoose.connection.close();
});
