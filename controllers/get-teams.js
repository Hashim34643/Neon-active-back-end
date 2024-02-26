const Team = require('../models/create-team');

const getAllTeams = async (req, res) => {
  try {
    const populatedTeams = await Team.find()
      .populate('leader', 'username firstName lastName email')
      .populate('members', 'username firstName lastName email');

    if (populatedTeams.length === 0) {
      return res.status(404).json({ success: false, message: 'No teams found' });
    }

    res.status(200).json({ success: true, teams: populatedTeams });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = getAllTeams;


