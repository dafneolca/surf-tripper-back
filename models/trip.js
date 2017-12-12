'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = new Schema({
  place: String,
  startDate: Date,
  endDate: Date,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  cost: Number,
  availableSpaces: Number,
  description: String,
  attendees: [{

  }]
  /*
  location: {
    type: { type: String },
    coordinates: [Number]
  }
  */
});

// tripSchema.index({ location: '2dsphere' });

const Trip = mongoose.model('Trip', tripSchema);

module.exports = {
  Trip
};
