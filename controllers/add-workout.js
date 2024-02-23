const addWorkoutModel = require("../models/add-workout");
const jwt = require("jsonwebtoken");
const User = require("../models/create-user");

const addWorkout = async (req, res) => {
    try {
        const {type, duration, addedAt} = req.body;

        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        const user = await User.findById(userId);
        const typeLC = type.toLowerCase();

        const newWorkout = new addWorkoutModel({
            user_id: userId,
            username: user.username,
            type: typeLC,
            duration,
            addedAt: addedAt || new Date()
        });
        await newWorkout.save();
        res.status(200).json({newWorkout});
    } catch (error) {
        if (error.errors && error.errors.type && error.errors.type.kind === 'enum') {
            return res.status(400).json({ message: "Invalid workout type" });
        }
        console.log(error)
        res.status(500).json({message: "Internal server error"})
    }
};

module.exports = addWorkout;