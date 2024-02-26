const mongoose = require("mongoose");
const User = require("../models/create-user");

const workoutSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['cardio', 'weights', 'stretching', "run", "walk", "gym", "jog"],
        required: true
    },
    duration: {
        type: Number,
        required: true
    }
});

workoutSchema.statics.getAllWorkouts = async function() {
    try {
        const workouts = await this.find();
        return workouts;
    } catch (error) {
        throw new Error(error.message);
    }
};

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;