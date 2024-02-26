const Team = require('../models/create-team');
const jwt = require('jsonwebtoken');
const User = require("../models/create-user");

const createTeam = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(401).json({ success: false, message: 'User not authorized' });
        }

        const { teamName } = req.body;

        if (!teamName) {
            return res.status(400).json({ success: false, message: 'Team name is required' });
        }

        const newTeam = new Team({
            name: teamName.toLowerCase(),
            leader: user._id,
            members: [user._id]
        });

        await newTeam.save();

        res.status(201).json({ success: true, message: 'Team created successfully', team: newTeam });
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        };
        if (error.code === 11000 && error.keyPattern && error.keyPattern.name === 1) {
            return res.status(400).json({ success: false, message: 'Team name already exists' });
        };
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports = createTeam;
