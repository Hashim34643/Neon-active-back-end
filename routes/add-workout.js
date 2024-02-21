const express = require("express");
const addWorkoutController = require("../controllers/add-workout");
const isAuth = require("../middleware/auth");

const addWorkoutRouter = express.Router();

addWorkoutRouter.post("/workouts/add", isAuth, addWorkoutController);

module.exports = addWorkoutRouter;