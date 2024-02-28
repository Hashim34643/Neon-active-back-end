const express = require('express');
const updateGoalRouter = express.Router();
const updateGoal = require('../controllers/update-goal');
const isAuth = require("../middleware/auth");


updateGoalRouter.patch('/user/:userId/goals/:goalId', updateGoal);

module.exports = updateGoalRouter;
