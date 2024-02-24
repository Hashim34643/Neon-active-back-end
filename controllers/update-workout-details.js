const Workout = require("../models/add-workout");

const updateWorkout = async (req, res) => {
    const workoutId = req.params.id;
    const {type, duration} = req.body;
    const updateFields = {};
    if (type) {
        updateFields.type = type;
    }
    if (duration) {
        updateFields.duration = duration;
    }
    try {
        const updatedWorkout = await Workout.findOneAndUpdate({ workoutId }, updateFields, { new: true });

        if (!updatedWorkout) {
            return res.status(404).json({ success: false, message: 'Workout not found.' });
        }
        res.status(200).json({ success: true, message: 'Workout details updated successfully', workout: updatedWorkout });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}

module.exports = updateWorkout;