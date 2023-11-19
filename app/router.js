const express = require('express')
const router = express.Router()
const auth = require('./middlewares/auth')


const courseRoutes = require('../app/routes/CoursesRoutes')
const searchRoutes = require('../app/routes/SearchRoutes')
const userRoutes = require('../app/routes/userRoutes')
const cartRoutes = require('../app/routes/cartRoutes')
const orderRoutes = require('../app/routes/orderRoutes')

router.use('/course', courseRoutes);
router.use('/search', searchRoutes);
router.use('/user', userRoutes);
router.use('/cart', auth, cartRoutes);
router.use('/order', auth, orderRoutes)


module.exports = router
