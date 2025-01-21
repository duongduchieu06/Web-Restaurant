const express = require("express");
const router = express.Router()
const userController = require('../controller/UserController')

router.post('/SignUp' , userController.createUser)
router.post('/SignIn' , userController.loginUser)
router.put('/UpdateUser/:id', userController.updateUser)


module.exports = router