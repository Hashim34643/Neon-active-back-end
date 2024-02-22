const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.NODE_ENV === "test" ? process.env.TEST_MONGO_URI : process.env.MONGO_URI;

mongoose.connect(mongoURI)
    .then(() => {
        console.log("db connected");
    })
    .catch((error) => {
        console.error(error.message);
    });

module.exports = mongoURI;