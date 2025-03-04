const express = require("express");
const router = express.Router()
const mealController = require('../controller/MealController');
const { authMiddleWare } = require("../middleware/authMidleware");

router.post('/CreateMeal' , authMiddleWare, mealController.createMeal)
router.put('/UpdateMeal/:id', authMiddleWare, mealController.updateMeal)
router.delete('/DeleteMeal/:id',authMiddleWare, mealController.deleteMeal)
router.get('/GetMeal/:id', mealController.getMeal)
router.get('/GetAll', mealController.getAll)

module.exports = router