const express = require('express');
const workoutByIdRouter = express.Router();
const getWorkoutByIdController = require('../controllers/get-workout-by-id');


workoutByIdRouter.get('/workouts/:id/', getWorkoutByIdController);


module.exports = workoutByIdRouter;