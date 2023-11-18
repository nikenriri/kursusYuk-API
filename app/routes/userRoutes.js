const express = require ('express');
const router = express.Router();
const userController = require ('../controllers/userControllers');


router.post('/register', userController.userRegister);
router.post('/login', userController.userLogin);
router.post('/editprofile', userController.userEditProfile);
router.post('/logout', userController.userLogout);
router.post('/delete', userController.deleteAccount);

module.exports = router;