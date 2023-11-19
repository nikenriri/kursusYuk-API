const express = require('express');
const router = express.Router();
const courseController = require('../controllers/CoursesController');
const allowedTo = require('../middlewares/permission')
const permission = require('../constants/permission')

router.get('/', allowedTo(permission.READ_PRODUCT), courseController.getAllCourses);
router.get('/:id', allowedTo(permission.READ_PRODUCT), courseController.getCourseById);
router.post('/create', allowedTo(permission.ADD_PRODUCT), courseController.createCourse);
router.put('/:id', allowedTo(permission.EDIT_PRODUCT), courseController.updateCourse);
router.delete('/:id', allowedTo(permission.DELETE_PRODUCT), courseController.deleteCourse);

module.exports = router;