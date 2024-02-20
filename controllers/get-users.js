const User = require("../models/get-users");

const getUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json({users});
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = getUsers;