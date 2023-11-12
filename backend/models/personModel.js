const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: { // driver or passenger
    type: String,
  },
  looking: { // looking for carpool or not
    type: String,
  },
  start: { // start coords
    type: [Number], // Array of numbers
  },
  end: { // end coords
    type: [Number], // Array of numbers
  }
});

// Custom validation function to ensure only two numbers are in the array


module.exports = mongoose.model("User", userSchema);
