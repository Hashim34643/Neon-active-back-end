const Workout = require('../models/get-workouts');

const getWorkoutsByUsername = async (req, res) => {
    try {
        const username = req.params.username;
        const workouts = await Workout.find({ username: username });
        if (!workouts || workouts.length === 0) {
            return res.status(404).json({ success: false, message: 'No workouts found for the specified user.' });
        }
        res.json({ success: true, workouts });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports = getWorkoutsByUsername
