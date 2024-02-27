const express = require('express');
const saveWorkoutPlanController = require('../controllers/save-workout-plan');
const saveWorkoutPlanRouter = express.Router();
const isAuth = require('../middleware/auth');

saveWorkoutPlanRouter.post('/workout-plan/save', isAuth, saveWorkoutPlanController); 

module.exports = saveWorkoutPlanRouter;
