const express = require('express');
const generateWorkoutPlanController = require('../controllers/generate-workout-plan');
const generateWorkoutPlanRouter = express.Router();

generateWorkoutPlanRouter.post("/generate-workout-plan", generateWorkoutPlanController);

module.exports = generateWorkoutPlanRouter; 
