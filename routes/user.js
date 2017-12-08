const express = require('express');
const router = express.Router();

const User = require('../models/user').User;

/* GET ALL TRIPS. */
router.get('/', (req, res, next) => {
  res.json({ User });
});

router.post('/', (req, res, next) => {
  console.log('user is being created ');
  // Take the params, and translate them into a new object
  const user = {
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    description: req.body.description,
    experienceLevel: req.body.experienceLevel
  };

  /* GET ONE USER. */
  router.get('/', (req, res, next) => {
    User.findOne({}, (err, results) => {
      if (err) {
        next(err);
        return;
      }
      res.json(results);
    });
  });

  const newUser = new User(user);
  // Save the product to the DB
  newUser.save((err, result) => {
    if (err) {
      return next(err);
    }
    return res.status(200).json({ 'message': 'success!' });
  });
});

module.exports = router;
