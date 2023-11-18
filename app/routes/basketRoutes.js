// routes/basketRoutes.js
const express = require('express');
const router = express.Router();
const { getAllProductsFromBasket, addProduct } = require('../controllers/basketControllers');

router.get('/', getAllProductsFromBasket)
router.post('/add', addProduct)

module.exports = router;
