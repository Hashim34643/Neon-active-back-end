const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
require("./models/db");
const createUserRouter = require("./routes/create-user");
const getUserRouter = require("./routes/get-users");
const loginRouter = require("./routes/logged-in");
const addWorkoutRouter = require("./routes/add-workout");
const getUserByIdRouter = require("./routes/get-user-byId");
const getWorkoutsRouter = require("./routes/get-workouts");

const app = express();

app.use(express.json());

app.use(createUserRouter);
app.use(getUserRouter);
app.use(loginRouter);
app.use(addWorkoutRouter);
app.use(getUserByIdRouter);
app.use(getWorkoutsRouter)

const server = app.listen(7951, () => {
    console.log("Port is listening");
});

module.exports = server;