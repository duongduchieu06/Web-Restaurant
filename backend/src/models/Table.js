const mongoose = require("mongoose")

const tableSchema = new mongoose.Schema(
    {
        floor: { type: Number, required: true },
        status: { type: String, enum: ["available", "occupied", "maintenance"], default: "available", },
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