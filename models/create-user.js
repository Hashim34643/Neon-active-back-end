const mongoose = require("mongoose");

const createUserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: Buffer
    }
});

createUserSchema.statics.isThisEmailInUse = async function(email) {
    if (!email) {
        throw new Error("Invalid email");
    }
    try {
        const user = await this.findOne({email});
        if (user) {
            return false 
        } else {
            return true
        }
    } catch(error) {
        return false;
    }
}

module.exports = mongoose.model("user", createUserSchema);