const User = require("../models/create-user");

const updateUserPoints = async (req, res) => {
    const {username} = req.params
    const {pointsToAdd} = req.body;

    try {
        if (isNaN(pointsToAdd)) { 
            return res.status(400).json({ success: false, message: 'pointsToAdd must be a number' });
        }
        const updatedUser = await User.findOneAndUpdate(
            { username },
            { $inc: { points: pointsToAdd } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, message: `${pointsToAdd} points added successfully`, updatedUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

module.exports = updateUserPoints;