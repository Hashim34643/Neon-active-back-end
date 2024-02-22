// routes/userRoutes.js
const express = require('express');
const updateUserRouter = express.Router();
const updateUserController = require('../controllers/update-user-details');

updateUserRouter.patch('/user/:username/update', updateUserController);

module.exports = updateUserRouter;
