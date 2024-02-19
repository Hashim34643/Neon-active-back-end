const express = require("express");
const createUserController = require("../controllers/create-user");
const {validateCreateUser, userValidation} = require("../middleware/validation/create-user")

const creatUserRouter = express.Router();

creatUserRouter.post("/create-user", validateCreateUser, userValidation, createUserController);

module.exports = creatUserRouter