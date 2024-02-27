const express = require("express");
const deleteWorkoutController = require("../controllers/delete-workout");

const deleteWorkoutsRouter = express.Router();

deleteWorkoutsRouter.delete("/workouts/:workoutPlanId", deleteWorkoutController);

module.exports = deleteWorkoutsRouter;