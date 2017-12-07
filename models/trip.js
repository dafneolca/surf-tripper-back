'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = new Schema({
  startDate: Date,
  endDate: Date,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  description: String,
  attendees: Array,
  location: {
    type: { type: String },
    coordinates: [Number]
  }
});

tripSchema.index({ location: '2dsphere' });

const Trip = mongoose.model('Trip', tripSchema);

module.exports = {
  Trip
};
