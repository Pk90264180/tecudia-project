const express = require('express');
const Restaurant = require('../models/restaurant');
const Cuisine = require('../models/cuisine');
const router = express.Router();

// Get all restaurants
router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.render('index', { restaurants });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', getRestaurantById, async (req, res) => {
  try {
    // Populate the cuisines field with actual cuisine documents
    const populatedRestaurant = await Restaurant.findById(
      req.params.id
    ).populate('cuisines');
    res.render('restaurant', { restaurant: populatedRestaurant });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new restaurant
router.post('/', async (req, res) => {
  const restaurant = new Restaurant({
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone,
    pictures: req.body.pictures,
    title: req.body.title,
    subtitle: req.body.subtitle,
    availability: req.body.availability,
    cuisines: req.body.cuisines,
  });

  try {
    const newRestaurant = await restaurant.save();
    res.status(201).json(newRestaurant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a restaurant by ID
router.put('/:id', getRestaurantById, async (req, res) => {
  if (req.body.name != null) {
    res.restaurant.name = req.body.name;
  }
  if (req.body.address != null) {
    res.restaurant.address = req.body.address;
  }
  if (req.body.phone != null) {
    res.restaurant.phone = req.body.phone;
  }
  if (req.body.pictures != null) {
    res.restaurant.pictures = req.body.pictures;
  }
  if (req.body.title != null) {
    res.restaurant.title = req.body.title;
  }
  if (req.body.subtitle != null) {
    res.restaurant.subtitle = req.body.subtitle;
  }
  if (req.body.availability != null) {
    res.restaurant.availability = req.body.availability;
  }
  if (req.body.cuisines != null) {
    res.restaurant.cuisines = req.body.cuisines;
  }

  try {
    const updatedRestaurant = await res.restaurant.save();
    res.json(updatedRestaurant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a restaurant by ID
router.delete('/:id', getRestaurantById, async (req, res) => {
  try {
    await res.restaurant.remove();
    res.json({ message: 'Restaurant deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get restaurant by ID
async function getRestaurantById(req, res, next) {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (restaurant == null) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.restaurant = restaurant;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
