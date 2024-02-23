const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const connectDb = require("./models/db");
const createUserRouter = require("./routes/create-user");
const getUserRouter = require("./routes/get-users");
const loginRouter = require("./routes/logged-in");
const addWorkoutRouter = require("./routes/add-workout");
const getUserByIdRouter = require("./routes/get-user-byId");
const getWorkoutsRouter = require("./routes/get-workouts");
const updateUserRouter = require("./routes/update-user-details");
const updateWorkoutRouter = require("./routes/update-workout-details");

connectDb();
const app = express();

app.use(express.json());

app.use(createUserRouter);
app.use(getUserRouter);
app.use(loginRouter);
app.use(addWorkoutRouter);
app.use(getUserByIdRouter);
app.use(getWorkoutsRouter);
app.use(updateUserRouter);
app.use(updateWorkoutRouter);

module.exports = app;