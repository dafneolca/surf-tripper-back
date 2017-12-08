var express = require('express');
var router = express.Router();

const Trip = require('../models/trip').Trip;

/* GET ALL TRIPS. */
router.get('/', (req, res, next) => {
  Trip.find({}, (err, results) => {
    if (err) {
      next(err);
      return;
    }
    console.log(results);
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
    res.status(200).json(result);
  });
});

/* CREATE A TRIP. */
router.post('/', (req, res, next) => {
  // Take the params, and translate them into a new object
  const trip = {
    place: req.body.place,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    description: req.body.description,
    location: {
      type: 'Point',
      coordinates: [req.body.lng, req.body.lat]
    }
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
