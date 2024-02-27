const Goals = require("../models/add-goals");

const updateGoal = async (req, res) => {
    
    const id = req.params.goalId;
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
    
        const updateGoal = await Goals.findByIdAndUpdate({_id: id} , updateFields, { new: true });
        
        if (!updateGoal) {
            return res.status(404).json({ success: false, message: 'Gaol not found.' });
        }
        res.status(200).json({ success: true, message: 'Goal details updated successfully', goal: updateGoal });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}

module.exports = updateGoal;
// 65dc6e3f690423bd3316c85f