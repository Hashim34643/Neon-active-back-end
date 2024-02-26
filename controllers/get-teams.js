const Team = require('../models/get-teams');

const getAllTeams = async (req, res) => {
    try {
        const teams = await Team.find().populate('leader members');
        if (teams.length === 0) {
            return res.status(404).json({ success: false, message: 'No teams found' });
        }
        res.status(200).json({ success: true, teams });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports = getAllTeams;

