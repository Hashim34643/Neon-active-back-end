const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
require("./models/db");
const createUserRouter = require("./routes/create-user");

const app = express();

app.use(express.json());

app.use(createUserRouter);

app.listen(7950, () => {
    console.log("Port is listening");
});