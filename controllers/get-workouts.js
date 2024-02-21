const Workout = require('../models/get-workouts');

const getAllWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find();
        res.json({ workouts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = getAllWorkouts;