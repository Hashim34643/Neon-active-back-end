const Goals = require("../models/add-goals");
const User = require('../models/create-user')


const deleteGoal = async (req, res) => {
    const userId = req.params.userId
    const goalId = req.params.goalId
 
   try {
        const user = await User.findById(userId);
        if (!user) {
        return res.status(404).json({ message: 'User not found' });
        }
        const goal = await Goals.findOne({ _id: goalId, user: userId });
        if (!goal) {
        return res.status(404).json({ message: 'Goal not found' });
        }
      
        await Goals.findByIdAndDelete(goalId);
        res.status(200).json({ success: true, message: 'Goal details Deleted successfully'});

    } catch (error) {
        res.status(404).json({ success: false, message: 'Invalid ID' });
    }
}


module.exports = deleteGoal;