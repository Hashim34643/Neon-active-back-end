const Goals = require("../models/add-goals");


const getGoalById = async (req, res) => {
 
   try {
        const userId = req.params.userId
        const goalId = req.params.goalId
       const singleGoal = await Goals.find({user: userId, _id: goalId});
    //    console.log(singleGoal)
      
       if (!singleGoal) {
           return res.status(404).json({ success: false, message: `No goal exist with this goalId ${req.params.goalId}` });
       }
       else if(singleGoal.length === 0){
        return res.status(404).json({ success: false, message: `No goals found for this userId ${userId}`});
       }
       res.status(200).json({ success: true, goals: singleGoal });
   } catch (error) {
    return res.status(404).json({ success: false, message: `Invalid ID`});
   }
}


module.exports = getGoalById;