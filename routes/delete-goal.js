const express = require('express');
const deleteGoalRouter = express.Router();
const deleteGoalController = require('../controllers/delete-goal');
const isAuth = require("../middleware/auth");




deleteGoalRouter.delete('/user/:userId/delete-goals/:goalId', isAuth, deleteGoalController);


module.exports = deleteGoalRouter;