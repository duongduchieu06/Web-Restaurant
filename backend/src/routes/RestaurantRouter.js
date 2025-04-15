const express = require("express");
const router = express.Router()
const restaurantController = require('../controller/RestaurantController');
const { authMiddleWare } = require("../middleware/authMiddleware");

router.post('/CreateRestaurant' , restaurantController.createRestaurant)
router.put('/UpdateRestaurant/:id', authMiddleWare, restaurantController.updateRestaurant)
router.delete('/DeleteRestaurant/:id', authMiddleWare, restaurantController.deleteRestaurant)
router.get('/GetRestaurant/:id', restaurantController.getRestaurant)
router.get('/GetAll', restaurantController.getAll)

module.exports = router