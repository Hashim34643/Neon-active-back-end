const express = require("express");
const updateWorkoutRouter = express.Router();
const updatedWorkoutController = require("../controllers/update-workout-details");

updateWorkoutRouter.patch("/workout/:workout_id/update", updatedWorkoutController);

module.exports = updateWorkoutRouter;
