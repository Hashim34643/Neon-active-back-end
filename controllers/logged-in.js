const User = require("../models/create-user");

const login = async (req, res) => {
    const { email, password } = req.body;
    const emailLC = email.toLowerCase();
    const user = await User.findOne({ email: emailLC });
    if (!user) {
        return res.status(401).json({ success: false, message: "User not found with given email" });
    }
    try {
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Email / password does not match" });
        } else {
            const responseData = {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            };
            res.json({ success: true, user: responseData });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

module.exports = login;

