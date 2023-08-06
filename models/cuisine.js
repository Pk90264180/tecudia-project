const mongoose = require('mongoose');

const cuisineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  veg: {
    type: Boolean,
    default: true,
  },
  pictures: {
    type: [String],
    default: [],
  },
  ingredients: {
    type: [String],
    default: [],
  },
});

const Cuisine = mongoose.model('Cuisine', cuisineSchema);

module.exports = Cuisine;
