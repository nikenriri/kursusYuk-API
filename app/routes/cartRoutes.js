// routes/basketRoutes.js
const express = require('express');
const router = express.Router();
const { getAllCart, addCourseCart, deleteCourseCart } = require('../controllers/cartControllers');
const allowedTo = require('../middlewares/permission')
const permission = require('../constants/permission')

router.get('/', allowedTo(permission.VIEW_CART), getAllCart)
router.post('/add',allowedTo(permission.ADD_TO_CART), addCourseCart)
router.delete('/:id',allowedTo(permission.DELETE_CART_ITEM), deleteCourseCart)

module.exports = router;
