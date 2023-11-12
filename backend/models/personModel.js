const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const coords = new Schema({
  lat: {
    type: Schema.Types.Decimal128,
    required: true,
  },
  lng: {
    type: Schema.Types.Decimal128, 
    required: true
  }
});


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
    type: coords, // Array of numbers
  },
  end: { // end coords
    type: coords, // Array of numbers
  }
});

// Custom validation function to ensure only two numbers are in the array


module.exports = mongoose.model("User", userSchema);
