const express = require("express");
const addUserToTeamController = require("../controllers/add-user-to-team");
const addUserToTeamRouter = express.Router();

addUserToTeamRouter.patch("/team/:teamname/add", addUserToTeamController);

module.exports = addUserToTeamRouter;