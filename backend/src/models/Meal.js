const mongoose = require("mongoose")

const mealSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        type: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String },
    },
    {
        timestamps: true,
    }
);

const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal