const express = require('express');
const getGoalByIdRouter = express.Router();
const getGoalById = require('../controllers/get-goal-by-id');
const isAuth = require("../middleware/auth");




getGoalByIdRouter.get('/goals/:goalId', isAuth, getGoalById);


module.exports = getGoalByIdRouter;