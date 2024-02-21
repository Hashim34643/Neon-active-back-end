const mongoose = require("mongoose");
const User = require("../models/create-user");

const addWorkoutSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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
    }
})

module.exports = mongoose.model("workout", addWorkoutSchema);