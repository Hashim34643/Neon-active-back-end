const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    leader: {
        type: {
            _id: mongoose.Schema.Types.ObjectId,
            username: String,
            firstName: String,
            lastName: String,
            email: String
        },
        ref: "User",
        required: true
    },
    dateFounded: {
        type: Date,
        default: Date.now
    },
    points: {
        type: Number,
        default: 0
    },
    members: [{
        type: {
            _id: mongoose.Schema.Types.ObjectId,
            username: String,
            firstName: String,
            lastName: String,
            email: String
        },
        ref: "User"
    }],
});

module.exports = mongoose.model("Team", teamSchema);