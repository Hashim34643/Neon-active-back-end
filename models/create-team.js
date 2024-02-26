const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true
    },
    leader: {
      type: mongoose.Schema.Types.ObjectId,
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
    members: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User"
    }
  });

module.exports = mongoose.model("team", teamSchema);