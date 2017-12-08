const mongoose = require('mongoose');

const Trip = require('../models/trip').Trip;
mongoose.connect('mongodb://localhost/trips');

const trips = [
  {
    place: String,
    startDate: Date.now(),
    endDate: Date.now(),
    owner: {
      type: ObjectId,
      ref: 'User'
    },
    description: 'Lets go surf in Hawaii - Hang loose guys',
    attendees: [],

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
