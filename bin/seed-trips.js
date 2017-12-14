const mongoose = require('mongoose');

const Trip = require('../models/trip').Trip;
mongoose.connect('mongodb://localhost:27017/surf-tripper-back');

const trips = [
  {
    place: String,
    startDate: Date.now(),
    endDate: Date.now(),
    owner: {
      type: ObjectId,
      ref: 'User'
    },
    tripDescription: String,
    attendees: [],
    places: Number,
    location: {
      type: { type: String },
      coordinates: [Number]
    }
  }

];

Trip.create(trips, (err, entries) => {
  if (err) {
    throw err;
  }
  console.log('Success', entries);
  mongoose.connection.close();
});
