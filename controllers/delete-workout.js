const Workout = require('../models/get-workouts');

const deleteWorkout = async (req, res) => {
    try {
        const workout = await Workout.findByIdAndDelete(req.params.id);
        if(!workout){
            return res.status(404).json({message: 'Invalid Id, Workout not found'})
        }
        res.status(200).json({message: 'Workout deleted successfully'});
    } catch (error) {
        res.status(404).json({ message: "Invalid Id, Workout not found" });
       
    }

};

module.exports = deleteWorkout;