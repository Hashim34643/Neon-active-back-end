const express = require('express');
const getGoalByIdRouter = express.Router();
const getGoalById = require('../controllers/get-goal-by-id');
const isAuth = require("../middleware/auth");




getGoalByIdRouter.get('/user/:userId/goals/:goalId', getGoalById);


module.exports = getGoalByIdRouter;