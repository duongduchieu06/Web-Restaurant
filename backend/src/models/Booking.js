const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, },
        table: { type: mongoose.Schema.Types.ObjectId, ref: "Table", required: true, },
        numberOfPeople: { type: String, required: true},
        date: { type: String, required: true },
        time: { type: String, required: true },
        note: { type: String },
        meals: [
            {
                mealId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Meal",
                    required: true,
                },
                quantity: {
                    type: Number,
                    default: 1,
                  },
            }
        ],
        totalPrice: { type: Number, default: 0 },
        paymentMethod: { type: String, enum: ["tiền mặt", "chuyển khoản"], default: "tiền mặt" },
        paymentStatus: { type: String, enum: ["chờ xử lý", "đã thanh toán"], default: "chờ xử lý" },
        qrCodeUTL: { type: String, default: "" },
        status: { type: String, enum: ["chờ xử lý", "đã xác nhận", "đã hủy", "đã xong"], default: "chờ xử lý" },
    },
    {
        timestamps: true,
    }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;