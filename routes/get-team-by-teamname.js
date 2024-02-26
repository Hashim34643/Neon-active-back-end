const express = require('express');
const getTeamByNameController = require('../controllers/get-team-by-teamname');
const getTeamByTeamnameRouter = express.Router();

getTeamByTeamnameRouter.get('/team/:teamname', getTeamByNameController);

module.exports = getTeamByTeamnameRouter;