const express = require('express');
const router = express.Router();
const searchController = require('../controllers/SearchController');

router.get('/courses', searchController.searchCourses);

module.exports = router;
