const WorkoutPlan = require('../models/save-workout-plan');
const jwt = require("jsonwebtoken");
const User = require("../models/create-user");

const saveWorkoutPlan = async (req, res) => {
    try {
        const { workoutPlanText, planName } = req.body;
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({ success: false, error: "Unauthorized" }); 
          }

        const newWorkoutPlan = new WorkoutPlan({
            userId,
            workoutPlanText,
            planName
        });

        await newWorkoutPlan.save();

        res.status(201).json({ success: true, message: "Workout Plan Saved", newWorkoutPlan });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error: "Error saving workout plan" });
    }
}

module.exports = saveWorkoutPlan;
