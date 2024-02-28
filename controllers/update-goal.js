const Goals = require("../models/add-goals");
const User = require('../models/create-user')

const updateGoal = async (req, res) => {
    
    const userId = req.params.userId
    const goalId = req.params.goalId
    const {goalType, target_points, description} = req.body;
    const updateFields = {};
    if (goalType) {
        updateFields.goalType = goalType;
    }
    if (target_points) {
        updateFields.target_points = target_points;
    }
    if (description) {
        updateFields.description = description;
    }
    try {
        const user = await User.findById(userId);
        if (!user) {
        return res.status(404).json({ message: 'User not found' });
        }
        const goal = await Goals.findOne({ _id: goalId, user: userId });
        if (!goal) {
        return res.status(404).json({ message: 'Goal not found' });
        }
    
        const updateGoal = await Goals.findByIdAndUpdate(goalId , updateFields, { new: true });
        res.status(200).json({ success: true, message: 'Goal details updated successfully', goals: updateGoal });

    } catch (error) {
        res.status(404).json({ success: false, message: 'Invalid ID' });
    }
}

module.exports = updateGoal;
