const express = require("express");
const updateUserPointsController = require("../controllers/update-user-points");
const updateUserPointsRouter = express.Router();

updateUserPointsRouter.patch("/user/:username/points/add", updateUserPointsController);

module.exports = updateUserPointsRouter;