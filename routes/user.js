const express = require('express');
const router = express.Router();

const User = require('../models/user').User;

/* GET ALL TRIPS. */
router.get('/', (req, res, next) => {
  res.json({ User });
});

// ADD TRIP TO PROFILE

router.post('/:userId', (req, res, next) => {
  console.log('req.body', req.body);
  const search = { _id: req.params.userId };
  const updates = {
    $push: { attendees: req.body.userId },
    $inc: { availableSpaces: -1 }
  };
  const options = { new: true };
  User.findOneAndUpdate(search, updates, options, (err, result) => {
    if (err) {
      next(err);
    }
    res.status(200).json(result);
  });
});
/// check above route!!

router.post('/', (req, res, next) => {
  console.log('user is being created ');
  // Take the params, and translate them into a new object
  const user = {
    username: req.body.username,
    experienceLevel: req.body.experienceLevel,
    tripsAttending: req.body.tripsAttending,
    userDescription: req.body.userDescription,
    email: req.body.email,
    password: req.body.password
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

// authorization:

module.exports = router;
