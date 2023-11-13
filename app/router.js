const express = require('express')
const router = express.Router()

const courseRoutes = require('../app/routes/CoursesRoutes')
const searchRoutes = require('../app/routes/SearchRoutes')
const basketRoutes = require('../app/routes/basketRoutes')

router.use('/', courseRoutes);
router.use('/search', searchRoutes);
router.use('/basket', basketRoutes)


module.exports = router
