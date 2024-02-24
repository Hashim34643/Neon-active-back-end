const express = require('express');
const getWorkoutsByUsernameRouter = express.Router();
const getWorkoutsByUsernameController = require('../controllers/get-workouts-by-username');

getWorkoutsByUsernameRouter.get('/user/workouts/:username', getWorkoutsByUsernameController);

module.exports = getWorkoutsByUsernameRouter;