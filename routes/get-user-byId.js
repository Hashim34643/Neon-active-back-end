const express = require("express");
const getUserById = require("../controllers/get-user-byId");

const usersRouter = express.Router();

usersRouter.get("/users/:id", getUserById);

module.exports = usersRouter;