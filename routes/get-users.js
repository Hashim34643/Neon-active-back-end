const express = require("express");
const getUsersController = require("../controllers/get-users");

const usersRouter = express.Router();

usersRouter.get("/users", getUsersController);

module.exports = usersRouter;