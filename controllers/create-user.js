const createUserModel = require("../models/create-user");

const createUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword } = req.body;
        const isNewUser = await createUserModel.isThisEmailInUse(email);
        if (!isNewUser) {
            return res.status(400).json({message: "This email is already in use try sign-in"})
        }
        const newUser = new createUserModel({
            firstName,
            lastName,
            email,
            password,
            confirmPassword
        });
        await newUser.save();
        res.status(200).json({ newUser });
    } catch(error) {
        res.status(500).json({message: "Internal server error"})
    }
}

module.exports = createUser;