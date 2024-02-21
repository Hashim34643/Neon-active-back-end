const User = require("../models/get-users");

const getUserById = async (req, res) => {
    try {
        const users = await User.findById(req.params.id);
        if(!users){
            return res.status(404).json({message: 'Invalid Id'})
        }
        res.status(200).json({users});
    } catch (error) {
        res.status(400).json({ message: "Bad Request" });
       
    }
};

module.exports = getUserById;