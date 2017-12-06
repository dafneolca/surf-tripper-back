const mongoose = require("mongoose");
const Trips = require("../models/trip");
mongoose.connect("mongodb://localhost/trips");

const trips = [
  {
    startDate: "22.01.2018",
    duration: 10,
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    description: "Lets go surf in Hawaii - Hang loose guys",
    attendees: { type: Array },

    location: {
      type: { type: String },
      coordinates: [Number]
    }
  }

];

JournalEntry.create(entries, (err, entries) => {
  if (err) {
    throw err;
  }
  console.log("Success", entries);
  mongoose.connection.close();
});
