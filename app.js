const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const restaurantController = require('./controllers/restaurantController');
const cuisineController = require('./controllers/cuisineController');
const adminController = require('./controllers/adminController');

const app = express();
const port = process.env.PORT || 3001;

app.set('view engine', 'ejs');

dotenv.config();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/restaurants', restaurantController);
app.use('/admin', adminController);
app.use('/cuisines', cuisineController);
app.get('/', (req, res) => {
  res.json({ restaurants: '/restaurants', version: '--version(0.0.1)' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
