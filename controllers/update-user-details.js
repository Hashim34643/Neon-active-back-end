const User = require("../models/create-user");

const updateUser = async (req, res) => {
    const oldUsername = req.params.username;
    const { username, firstName, lastName, email } = req.body;
    const updateFields = {};
    if (username) {
        updateFields.username = username;
    }
    if (firstName) {
        updateFields.firstName = firstName;
    }
    if (lastName) {
        updateFields.lastName = lastName;
    }
    if (email) {
        updateFields.email = email;
    }
    try {
        const updatedUser = await User.findOneAndUpdate({ username: oldUsername }, updateFields, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        res.status(200).json({ success: true, message: 'User details updated successfully.', user: updatedUser });
    } catch (error) {
        console.error('Error updating user details:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}

module.exports = updateUser;