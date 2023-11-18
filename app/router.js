const express = require('express')
const router = express.Router()
const auth = require('./middlewares/auth')


const courseRoutes = require('../app/routes/CoursesRoutes')
const searchRoutes = require('../app/routes/SearchRoutes')
const userRoutes = require('../app/routes/userRoutes')
const cartRoutes = require('../app/routes/cartRoutes')

router.use('/course', courseRoutes);
router.use('/search', searchRoutes);
router.use('/user', userRoutes);
router.use('/cart', auth, cartRoutes);


module.exports = router
