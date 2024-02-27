const Goals = require("../models/add-goals");


const getAllGoals = async (req, res) => {
   try {
       const userId = req.params.userId
       const goals = await Goals.find({user: userId});
       if(!goals){
           return res.status(404).json({message: 'Goals not found'})
       }
       res.status(200).json({goals});
   } catch (error) {
       res.status(500).json({ message: `Goals not found for UserId: ${req.params.userId}`});
     
   }
};


module.exports = getAllGoals;