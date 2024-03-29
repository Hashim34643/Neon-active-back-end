const User = require("../models/create-user");
const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    leader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    points: {
        type: Number,
        default: 0
    },
    dateFounded: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Team', teamSchema);