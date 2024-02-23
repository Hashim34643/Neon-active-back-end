const User = require("../models/create-user");
const jwt = require("jsonwebtoken")

const updateUser = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    const usernameParam = req.params.username;
    const usernameParamLC = usernameParam.toLowerCase();
    const user = await User.findOne({_id: userId});
    if (user.username !== usernameParamLC) {
        return res.status(404).json({success: false, message: "User not found"})
    }
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
        const updatedUser = await User.findOneAndUpdate({ _id: userId }, updateFields, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        res.status(200).json({ success: true, message: 'User details updated successfully.', user: updatedUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}

module.exports = updateUser;