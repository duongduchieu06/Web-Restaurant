const mongoose = require("mongoose")

const tableSchema = new mongoose.Schema(
    {
        floor: { type: Number, required: true },
        status: { type: String, enum: ["khả dụng", "đang bận", "bảo trì"], default: "khả dụng", },
        bookings: [
            {type: mongoose.Schema.Types.ObjectId, ref: "Booking",}
        ],
    },
    {
        timestamps: true,
    }
);

const Table = mongoose.model("Table", tableSchema);

module.exports = Table;