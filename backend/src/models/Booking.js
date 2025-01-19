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
        paymentMethod: { type: String, enum: ["cash", "online"], default: cash },
        paymentStatus: { type: String, enum: ["pending", "paid", "refunded"], default: pending },
        qrCodeUTL: { type: String, default: "" },
        status: { type: String, enum: ["pending", "confirmed", "cancelled", "done"], default: pending },
    },
    {
        timestamps: true,
    }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;