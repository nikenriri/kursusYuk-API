// routes/basketRoutes.js
const express = require('express');
const router = express.Router();
const { getAllProductsFromBasket } = require('../controllers/basketControllers');

router.get('/', getAllProductsFromBasket)

module.exports = router;
