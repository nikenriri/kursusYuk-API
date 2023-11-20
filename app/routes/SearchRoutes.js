const express = require('express');
const router = express.Router();
const { searchCourses } = require('../controllers/SearchController');
const allowedTo = require('../middlewares/permission')
const permission = require('../constants/permission')

router.get('/courses', allowedTo(permission.BROWSE_PRODUCTS), searchCourses);

module.exports = router;
