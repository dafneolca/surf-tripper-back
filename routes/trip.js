var express = require('express');
var router = express.Router();

const Trip = require('../models/trip').Trip;
const User = require('../models/user').User;

/* GET ALL TRIPS. */
router.get('/', (req, res, next) => {
  Trip.find({}, (err, results) => {
    if (err) {
      next(err);
      return;
    }
    res.json(results);
  });
});

/* GET ONE TRIP */
router.get('/:id', (req, res, next) => {
  Trip.findOne({ _id: req.params.id }, (err, result) => {
    if (err) {
      next(err);
      return;
    }
    if (!result) {
      res.status(404).json({ error: 'error.not-found' });
      return;
    }
    User.findOne({ _id: result.owner }, (err, userObj) => {
      if (err) {
        next(err);
      } else {
        const tripDetails = {
          trip: result,
          user: userObj
        };
        res.status(200).json(tripDetails);
      }
    });
  });
});

/* CREATE A TRIP. */
router.post('/', (req, res, next) => {
  // Take the params, and translate them into a new object
  console.log(req.body);
  const trip = {
    place: req.body.trip.place,
    startDate: req.body.trip.startDate,
    endDate: req.body.trip.endDate,
    availableSpaces: req.body.trip.availableSpots,
    cost: req.body.trip.cost,
    owner: req.body.userID
    // location: {
    //   type: 'Point',
    //   coordinates: [req.body.lng, req.body.lat]
    // }
  };

  const newTrip = new Trip(trip);
  // Save the product to the DB
  newTrip.save((err, result) => {
    if (err) {
      return next(err);
    }
    return res.status(200).json({ 'message': 'success!' });
  });
});

module.exports = router;
