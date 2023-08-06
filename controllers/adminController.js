const express = require('express');
const Restaurant = require('../models/restaurant');
const Cuisine = require('../models/cuisine');
const router = express.Router();

router.get('/add', (req, res) => {
  res.render('addRestaurant');
});
router.get('/', (req, res) => {
  res.render('admin');
});

router.get('/:id/dishes/add', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.render('addDish', { restaurant });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/:id/dishes', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const dish = {
      name: req.body.name,
      description: req.body.description,
      veg: req.body.veg ? true : false,
      pictures: req.body.pictures,
      ingredients: req.body.ingredients,
    };
    // const dish = {
    //   name: req.body.name,
    //   description: req.body.description,
    //   veg: req.body.veg ? true : false,
    //   pictures: req.body.pictures,
    //   ingredients: req.body.ingredients,
    // };

    restaurant.cuisines.push(dish);

    await restaurant.save();

    res.redirect(`/restaurants/${restaurant._id}`);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
