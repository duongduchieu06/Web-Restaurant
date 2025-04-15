const express = require("express");
const { paymentWithVnPay, vnpayReturn } = require("../controller/CheckoutRouter");
const router = express.Router()

router.post("/create_payment_url", paymentWithVnPay)
router.get('/vnpay_return', vnpayReturn);

module.exports = router