const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  pictures: {
    type: [String],
    default: [],
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  cuisines: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cuisine', // Reference the Cuisine model
    },
  ],
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
