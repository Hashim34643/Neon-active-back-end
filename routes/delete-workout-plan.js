const express = require("express");
const deleteWorkoutPlanController = require("../controllers/delete-workout-plan");
const isAuth = require("../middleware/auth");
const deleteWorkoutPlanRouter = express.Router();

deleteWorkoutPlanRouter.delete("/workout-plan/delete/:id", isAuth, deleteWorkoutPlanController);

module.exports = deleteWorkoutPlanRouter