const express = require("express");
const addGoalController = require("../controllers/add-goals");
const isAuth = require("../middleware/auth");


const addGoalRouter = express.Router();


addGoalRouter.post("/create-goals", isAuth, addGoalController);


module.exports = addGoalRouter;