const Team = require('../models/get-teams');

const getTeamByName = async (req, res) => {
    try {
        const teamName = req.params.teamname;
        const team = await Team.findOne({ name: teamName }).populate('leader members');
        if (!team) {
            return res.status(404).json({ success: false, message: 'Team not found' });
        }

        res.status(200).json({ success: true, team });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports = getTeamByName;
