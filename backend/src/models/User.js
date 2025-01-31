const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        phone: { type: String, required: false },
        isAdmin: { type: Boolean, default: false, required: true },
        accress_token: { type: Number, require: true },
        refresh_token: { type: String, require: true },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User