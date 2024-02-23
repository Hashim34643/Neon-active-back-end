const mongoose = require("mongoose");
const User = require("../models/create-user");

const addWorkoutSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['cardio', 'weights', 'stretching'],
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    addedAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("workout", addWorkoutSchema);