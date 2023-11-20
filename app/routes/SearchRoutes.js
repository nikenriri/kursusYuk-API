const express = require('express');
const router = express.Router();
const { searchCourses } = require('../controllers/SearchController');
const allowedTo = require('../middlewares/permission')
const permission = require('../constants/permission')

router.get('/courses', searchCourses);

module.exports = router;
