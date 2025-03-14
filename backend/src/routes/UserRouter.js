const express = require("express");
const router = express.Router()
const userController = require('../controller/UserController');
const { authMiddleWare, authUserMiddleware } = require("../middleware/authMidleware");

router.post('/SignUp' , userController.createUser)
router.post('/SignIn' , userController.loginUser)
router.put('/UpdateUser/:id', userController.updateUser)
router.delete('/DeleteUser/:id',authMiddleWare, userController.deleteUser)
router.get('/GetAll',authMiddleWare, userController.getAll)
router.get('/GetUser/:id',authUserMiddleware, userController.getUser)
router.post('/RefreshToken', userController.refreshToken)

module.exports = router