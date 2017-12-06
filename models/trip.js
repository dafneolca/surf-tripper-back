'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = new Schema({
  startDate: { type: Date },
  duration: { type: Number },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  description: { type: String },
  attendees: { type: Array },

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
