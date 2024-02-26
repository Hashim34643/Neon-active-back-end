const Team = require('../models/create-team');
const User = require('../models/create-user');

const addUserToTeam = async (req, res) => {
  try {
    const { teamName, username } = req.body;

    if (!teamName || !username) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const team = await Team.findOne({ name: teamName.toLowerCase() });

    if (!team) {
      return res.status(404).json({ success: false, message: 'Team not found' });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (team.members.some((member) => member.equals(user._id))) {
      return res.status(400).json({ success: false, message: 'User is already a member' });
    }

    team.members.push(user._id);

    await team.save();

    const populatedTeam = await Team.findById(team._id).populate('members', 'username firstName lastName email');
    res.status(200).json({ success: true, message: 'User added to team successfully', team: populatedTeam });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = addUserToTeam;
