const addWorkoutModel = require("../models/add-workout");
const jwt = require("jsonwebtoken");

const addWorkout = async (req, res) => {
    try {
        const {type, duration} = req.body;

        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;

        const newWorkout = new addWorkoutModel({
            user_id: userId,
            type,
            duration,
        });
        await newWorkout.save();
        res.status(200).json({newWorkout});
    } catch (error) {
        if (error.errors && error.errors.type && error.errors.type.kind === 'enum') {
            return res.status(400).json({ message: "Invalid workout type" });
        }
        res.status(500).json({message: "Internal server error"})
    }
};

module.exports = addWorkout;