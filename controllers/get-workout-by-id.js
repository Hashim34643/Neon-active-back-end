const Workout = require('../models/get-workouts');


const getWorkoutById = async (req, res) => {
   try {
       const workout = await Workout.findById(req.params.id);
       if(!workout){
           return res.status(404).json({message: 'Invalid Id'})
       }
       res.status(200).json({ workout });
   } catch (error) {
       res.status(400).json({ message: "Bad Request" });
   }
};


module.exports = getWorkoutById;