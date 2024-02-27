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
const getAllTeamsRouter = require("./routes/get-teams");
const getTeamByTeamnameRouter = require("./routes/get-team-by-teamname");
const addUserToTeamRouter = require("./routes/add-user-to-team");
const generateWorkoutPlanRouter = require("./routes/generate-workout-plan");
const addGoalRouter = require('./routes/add-goals')
const getAllGoalsRouter = require('./routes/get-all-goals-for-a-user')
const updateGoalRouter = require('./routes/update-goal');
const saveWorkoutPlanRouter = require("./routes/save-workout-plan");
const getGoalByIdRouter = require('./routes/get-goal-by-id');
const deleteWorkoutPlanRouter = require("./routes/delete-workout-plan");

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
app.use(getAllTeamsRouter);
app.use(getTeamByTeamnameRouter);
app.use(addUserToTeamRouter);
app.use(generateWorkoutPlanRouter);
app.use(addGoalRouter)
app.use(getAllGoalsRouter)
app.use(updateGoalRouter)
app.use(saveWorkoutPlanRouter);
app.use(getGoalByIdRouter)
app.use(deleteWorkoutPlanRouter);

const server = app.listen(7952, () => {
  console.log("Port is listening");
});

module.exports = server;
