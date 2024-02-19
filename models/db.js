const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
    .then((response) => {
        console.log("db connected");
    })
    .catch((error) => {
        console.error(error.message);
    });