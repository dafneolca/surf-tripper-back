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
  Trip.findOne({ _id: req.params.id })
    .populate('owner')
    .populate('attendees')
    .exec((err, trip) => {
      if (err) {
        next(err);
        return;
      }
      if (!trip) {
        res.status(404).json({ error: 'error.not-found' });
        return;
      }
      res.status(200).json(trip);
    });
});

/* CREATE A TRIP. */
router.post('/', (req, res, next) => {
  // Take the params, and translate them into a new object
  console.log('req body of createa a trip: ', req.body);
  const trip = {
    place: req.body.trip.place,
    startDate: req.body.trip.startDate,
    endDate: req.body.trip.endDate,
    availableSpaces: req.body.trip.availableSpots,
    cost: req.body.trip.cost,
    tripDescription: req.body.trip.tripDescription,
    owner: req.body.userID,
    attendees: req.body.userID
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
  console.log('const trip: ', trip);
});

// JOIN A TRIP  ->Created Wed.
router.post('/:tripId/join', (req, res, next) => {
  console.log('req.body', req.body);
  const search = { _id: req.params.tripId };
  const updates = {
    $push: { attendees: req.body.userId },
    $inc: { availableSpaces: -1 }
  };
  const options = { new: true };
  Trip.findOneAndUpdate(search, updates, options, (err, result) => {
    if (err) {
      next(err);
    }
    res.status(200).json(result);
  });
});

// $http.put('/', userId, config)
//   .then(
//     function (response) {
//     // success callback
//     },
//     function (response) {
//     // failure callback
//     }
//   );

module.exports = router;
