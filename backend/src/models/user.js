import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        required: true,
        type: String
    },
    password:{
        required: true,
        type: String,
        minlength: 4
    },
    fullName:{
        type: String,
        required: true,
    },
    profilePic:{
        required: false,
        type: String
    },

}, {
    timestamps: true
})

// When this file is imported multiple times, Mongoose tries to re-register User → 💥 error.
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;