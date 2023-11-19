// routes/basketRoutes.js
const express = require('express');
const router = express.Router();
const { createOrder, getOrder, deleteOrder } = require('../controllers/orderControllers');
const allowedTo = require('../middlewares/permission')
const permission = require('../constants/permission')

router.get('/', allowedTo(permission.READ_ORDER), getOrder)
router.post('/add',allowedTo(permission.ADD_ORDER), createOrder)
router.delete('/:id',allowedTo(permission.DELETE_CART_ITEM), deleteOrder)

module.exports = router;
