const WorkoutPlan = require('../models/save-workout-plan');
const jwt = require("jsonwebtoken");
const User = require("../models/create-user");

const deleteWorkoutPlan = async (req, res) => {
    try {
        const workoutPlanId = req.params.id;
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({ success: false, error: "Unauthorized" }); 
        }
        const workoutPlan = await WorkoutPlan.findById(workoutPlanId);
        if (!workoutPlan) {
            return res.status(404).json({ error: "Workout plan not found" });
        }
        if (workoutPlan.userId.toString() !== userId) { 
          return res.status(401).json({ error: "Unauthorized" }); 
        }

        await WorkoutPlan.deleteOne({ _id: workoutPlanId });

        res.json({ success: true, message: "Workout plan deleted" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = deleteWorkoutPlan; 
