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
  type: {
    type: String,
    required: true
  },
  looking: {
    type: String,
    required: true
  },
  start: {
    type: [Number], // Array of numbers
    validate: [arrayLimit, '{PATH} exceeds the limit of 2'], // Custom validator for array length
  },
  end: {
    type: [Number], // Array of numbers
    validate: [arrayLimit, '{PATH} exceeds the limit of 2'], // Custom validator for array length
  }
});

// Custom validation function to ensure only two numbers are in the array
function arrayLimit(val) {
  return val.length === 2;
}

module.exports = mongoose.model("User", userSchema);
