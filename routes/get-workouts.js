const express = require("express");
const getWorkoutsController = require("../controllers/get-workouts");

const getWorkoutsRouter = express.Router();

getWorkoutsRouter.get("/workouts", getWorkoutsController);

module.exports = getWorkoutsRouter;