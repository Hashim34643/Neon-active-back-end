const addGoalModel = require("../models/add-goals");
const jwt = require("jsonwebtoken");
const User = require("../models/create-user");


const addGoal = async (req, res) => {
   try {
       const {goalType, target_points, description, startDate, endDate } = req.body;


       const token = req.headers.authorization.split(" ")[1];
       const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
       const userId = decodedToken.userId;
       const user = await User.findById(userId);
    
      
       if (!user) {
           return res.status(404).json({ message: 'User not found' });
         }
       const newGoal = new addGoalModel({
           user: userId,
           goalType,
           description,
           target_points,
           startDate: startDate || new Date(),
           endDate: endDate || new Date()
       });
       console.log(newGoal)
       await newGoal.save();
       res.status(200).json({newGoal});
   } catch (error) {
       if (error.errors && error.errors.type && error.errors.type.kind === 'enum') {
           return res.status(400).json({ message: "Invalid Goal type" });
       }
       console.log(error.name)
       res.status(404).json({message: "User not found"})
   }
};


module.exports = addGoal;
