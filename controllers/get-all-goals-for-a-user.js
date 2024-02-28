const Goals = require("../models/add-goals");


const getAllGoals = async (req, res) => {
   try {
       const userId = req.params.userId
       const goals = await Goals.find({user: userId});
       if(goals.length === 0){
        return res.status(404).json({message: `No Goal Found for this userId ${userId}`})
    }

    else if(!goals){
        return res.status(404).json({message: 'Invalid User ID'})
       }
 
       res.status(200).json({goals});
   } catch (error) {
    res.status(404).json({ message: `Invalid User ID`});
     
   }
};


module.exports = getAllGoals;