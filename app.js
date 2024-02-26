const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
require("./models/db");
const createUserRouter = require("./routes/create-user");
const getUserRouter = require("./routes/get-users");
const loginRouter = require("./routes/logged-in");
const addWorkoutRouter = require("./routes/add-workout");
const getUserByIdRouter = require("./routes/get-user-byId");
const getWorkoutsRouter = require("./routes/get-workouts");
const workoutByIdRouter = require('./routes/get-workout-by-id')
const deleteWorkoutsRouter = require('./routes/delete-workout')
const updateUserRouter = require("./routes/update-user-details");
const updateWorkoutRouter = require("./routes/update-workout-details");
const getWorkoutsByUsernameRouter = require("./routes/get-workouts-by-username");
const updateUserPointsRouter = require("./routes/update-user-points");
const createTeamRouter = require("./routes/create-team");

const app = express();

app.use(cors());
app.use(express.json());

app.use(createUserRouter);
app.use(getUserRouter);
app.use(loginRouter);
app.use(addWorkoutRouter);
app.use(getUserByIdRouter);
app.use(getWorkoutsRouter);
app.use(workoutByIdRouter)
app.use(deleteWorkoutsRouter)
app.use(updateUserRouter);
app.use(updateWorkoutRouter);
app.use(getWorkoutsByUsernameRouter);
app.use(updateUserPointsRouter);
app.use(createTeamRouter)

const server = app.listen(7952, () => {
  console.log("Port is listening");
});

module.exports = server;
