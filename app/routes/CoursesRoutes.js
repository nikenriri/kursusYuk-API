const express = require('express');
const router = express.Router();
const courseController = require('../controllers/CoursesController');

router.get('/courses', courseController.getAllCourses);
router.get('/courses/:product_id', courseController.getCourseById);
router.post('/courses', courseController.createCourse);
router.put('/courses/:product_id', courseController.updateCourse);
router.delete('/courses/:product_id', courseController.deleteCourse);

module.exports = router;