const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
require("./models/db");
const createUserRouter = require("./routes/create-user");
const getUserRouter = require("./routes/get-users");

const app = express();

app.use(express.json());

app.use(createUserRouter);
app.use(getUserRouter);

const server = app.listen(7950, () => {
    console.log("Port is listening");
});

module.exports = server;