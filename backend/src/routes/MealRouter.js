const express = require("express");
const router = express.Router()
const mealController = require('../controller/MealController');
const { authMiddleWare } = require("../middleware/authMidleware");

router.post('/CreateMeal' , mealController.createMeal)
router.put('/UpdateMeal/:id', authMiddleWare, mealController.updateMeal)
router.delete('/DeleteMeal/:id', mealController.deleteMeal)
router.get('/GetMeal/:id', mealController.getMeal)
router.get('/GetAll', mealController.getAll)
/*
router.post('/SignUp' , userController.createUser)
router.post('/SignIn' , userController.loginUser)
router.put('/UpdateUser/:id', userController.updateUser)
router.delete('/DeleteUser/:id',authMiddleWare, userController.deleteUser)
router.get('/GetAll',authMiddleWare, userController.getAll)
router.get('/GetUser/:id',authUserMiddleware, userController.getUser)
router.post('/RefreshToken', userController.refreshToken)
*/
module.exports = router