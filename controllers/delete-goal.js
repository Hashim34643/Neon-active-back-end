const Goals = require("../models/add-goals");


const deleteGoal = async (req, res) => {
 
   try {
      
       const singleGoal = await Goals.findByIdAndDelete(req.params.goalId);
      
       if (!singleGoal) {
           return res.status(404).json({ success: false, message: `No goal exist with this goalId ${req.params.goalId}` });
       }
       res.status(200).json({ success: true, message: 'Goal successfully deleted' });
   } catch (error) {
    return res.status(404).json({ success: false, message: `No goal exist with this goalId ${req.params.goalId}` });
   }
}


module.exports = deleteGoal;