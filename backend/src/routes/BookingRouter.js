const express = require("express");
const router = express.Router()
const BookingController = require('../controller/BookingController');
const { authMiddleWare, authUserMiddleware } = require("../middleware/authMiddleware");

router.post('/BookingTable' , authUserMiddleware, BookingController.bookingTable)
router.put('/UpdateBooking/:id', authUserMiddleware, BookingController.updateBooking)
router.put('/CancleBooking/:id', authUserMiddleware, BookingController.cancleBooking)
router.get('/GetBooking/:id',authUserMiddleware, BookingController.getBooking)
router.get('/GetAll', authMiddleWare, BookingController.getAll)
router.get("/GetMyBookings", authUserMiddleware, BookingController.getMyBookings);
router.put("/UpdateMeals/:id", authUserMiddleware, BookingController.updateMeals);

module.exports = router