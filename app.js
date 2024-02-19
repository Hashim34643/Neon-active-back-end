const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
require("./models/db")

const app = express();

app.use(express.json());

app.listen(7950, () => {
    console.log("Port is listening");
})
//