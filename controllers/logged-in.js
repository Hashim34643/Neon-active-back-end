const User = require("../models/create-user");

const login = async (req, res) => {
    const {email, password} = req.body;
    const emailLC = email.toLowerCase();
    const user = await User.findOne({email: email.toLowerCase()});
    if (!user) {
        res.json({success: false, message: "User noy found with given email"});
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.json({message: "Email / password does not match"});
    } else {
        res.json({success: true, user: user});
    }
}

module.exports = login;