const express = require("express");
const getAllTeamsController = require("../controllers/get-teams");
const getAllTeamsRouter = express.Router();

getAllTeamsRouter.get("/teams", getAllTeamsController);

module.exports = getAllTeamsRouter;