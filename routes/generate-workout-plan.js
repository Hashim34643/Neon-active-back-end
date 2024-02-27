const express = require('express');
const generateWorkoutPlanController = require('../controllers/generate-workout-plan');
const generateWorkoutPlanRouter = express.Router();

generateWorkoutPlanRouter.post("/workout-plan/generate", generateWorkoutPlanController);

module.exports = generateWorkoutPlanRouter; 
