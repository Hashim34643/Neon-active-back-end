const mongoose = require('mongoose');
const User = require("../models/create-user");


const goalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    goalType: {
        type: String,
        enum: ['Weight loss', 'Muscle gain', 'Endurance'],
        required: true
    },
    target_points: {
        type: Number,
    },
    description: {
        type: String,
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        default: Date.now
    }
 });
 
 
 module.exports = mongoose.model("Goal", goalSchema);