const mongoose = require("mongoose");
require("dotenv").config();

const ENV = process.env.NODE_ENV || 'test';
const mongoURI = process.env.NODE_ENV === "test" ? process.env.TEST_MONGO_URI : process.env.MONGO_URI;

const config = {};
if (ENV === 'production') {
    config.connectionString = process.env.DATABASE_URL;
    config.max = 2;
  }
const connectDb = async () => {
    if (typeof mongoURI !== 'string') {
        throw new Error('Invalid MongoDB URI: must be a string');
      }
    try {
        await mongoose.connect(mongoURI);
        console.log("db connected");
    } catch(error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
}

module.exports = connectDb;