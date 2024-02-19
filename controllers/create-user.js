const createUserModel = require("../models/create-user");

const createUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword } = req.body;
        const newUser = new createUserModel({
            firstName,
            lastName,
            email,
            password,
            confirmPassword
        });
        await newUser.save();
        res.json({ newUser });
    } catch(error) {
        if (error.code === 11000) {
            res.status(400).json({ message: "Email already in use please try sign-in"});
        } else {
            res.status(500).json({ message: "Internal server error"});
        }
    }
}

module.exports = createUser;