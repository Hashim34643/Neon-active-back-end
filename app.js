const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
require("./models/db");
const createUserRouter = require("./routes/create-user");
const getUserRouter = require("./routes/get-users");
const loginRouter = require("./routes/logged-in");
const getUserById = require("./routes/get-user-byId");
const User = require("./models/create-user");

const app = express();

app.use(express.json());

app.use(createUserRouter);
app.use(getUserRouter);
app.use(loginRouter)
app.use(getUserById)

const server = app.listen(7950, () => {
    console.log("Port is listening");
});

module.exports = server;