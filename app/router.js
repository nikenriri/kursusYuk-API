const express = require('express')
const router = express.Router()

const basketRoutes = require('./handlers/basketHandlers')

router.use('/basket', basketRoutes)


module.exports = router
