const express = require("express");
const getAllGoalsController = require("../controllers/get-all-goals-for-a-user");


const isAuth = require("../middleware/auth");
const getAllGoalsRouter = express.Router();
getAllGoalsRouter.get("/goals/:userId", isAuth, getAllGoalsController);

module.exports = getAllGoalsRouter;