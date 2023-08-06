const express = require('express');
const Cuisine = require('../models/cuisine');

const router = express.Router();

// // Get a specific cuisine by ID
// router.get('/:id', getCuisineById, (req, res) => {
//   res.json(res.cuisine);
// });

// Get a specific cuisine by ID
router.get('/:id', getCuisineById, async (req, res) => {
  try {
    res.render('cuisine', { cuisine: res.cuisine });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get cuisine by ID
async function getCuisineById(req, res, next) {
  try {
    const cuisine = await Cuisine.findById(req.params.id);
    if (cuisine == null) {
      return res.status(404).json({ message: 'Cuisine not found' });
    }
    res.cuisine = cuisine;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// Create a new cuisine
router.post('/', async (req, res) => {
  const cuisine = new Cuisine({
    name: req.body.name,
    description: req.body.description,
    veg: req.body.veg,
    pictures: req.body.pictures,
    ingredients: req.body.ingredients,
  });

  try {
    const newCuisine = await cuisine.save();
    res.status(201).json(newCuisine);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a cuisine by ID
router.put('/:id', getCuisineById, async (req, res) => {
  if (req.body.name != null) {
    res.cuisine.name = req.body.name;
  }
  if (req.body.description != null) {
    res.cuisine.description = req.body.description;
  }
  if (req.body.veg != null) {
    res.cuisine.veg = req.body.veg;
  }
  if (req.body.pictures != null) {
    res.cuisine.pictures = req.body.pictures;
  }
  if (req.body.ingredients != null) {
    res.cuisine.ingredients = req.body.ingredients;
  }

  try {
    const updatedCuisine = await res.cuisine.save();
    res.json(updatedCuisine);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a cuisine by ID
router.delete('/:id', getCuisineById, async (req, res) => {
  try {
    await res.cuisine.remove();
    res.json({ message: 'Cuisine deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get cuisine by ID
async function getCuisineById(req, res, next) {
  try {
    const cuisine = await Cuisine.findById(req.params.id);
    if (cuisine == null) {
      return res.status(404).json({ message: 'Cuisine not found' });
    }
    res.cuisine = cuisine;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
