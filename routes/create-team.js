const express = require("express");
const createTeamController = require("../controllers/create-team");
const isAuth = require("../middleware/auth");
const createTeamRouter = express.Router();

createTeamRouter.post("/create-team", isAuth, createTeamController);

module.exports = createTeamRouter;