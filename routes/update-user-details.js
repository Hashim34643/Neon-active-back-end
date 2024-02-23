const express = require('express');
const updateUserRouter = express.Router();
const updateUserController = require('../controllers/update-user-details');
const isAuth = require("../middleware/auth");

updateUserRouter.patch('/user/:username/update', isAuth, updateUserController);

module.exports = updateUserRouter;
