const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    thoughts: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'thought'
    },
    friends: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})


userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})
const User = model("User", userSchema);
module.exports = User;