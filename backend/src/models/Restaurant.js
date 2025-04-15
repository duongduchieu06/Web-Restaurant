const mongoose = require("mongoose")

const mealSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        numberOfFloor: { type: Number, required: true },
        timeAvailable: [{ type: String, required: true }],
    },
    {
        timestamps: true,
    }
);

const Restaurant = mongoose.model('Restaurant', mealSchema);

module.exports = Restaurant