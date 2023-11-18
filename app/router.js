const express = require('express')
const router = express.Router()

const courseRoutes = require('../app/routes/CoursesRoutes')
const searchRoutes = require('../app/routes/SearchRoutes')
const basketRoutes = require('../app/routes/basketRoutes')
const userRoutes = require('../app/routes/userRoutes')

router.use('/', courseRoutes);
router.use('/search', searchRoutes);
router.use('/basket', basketRoutes);
router.use('/user', userRoutes);


module.exports = router
