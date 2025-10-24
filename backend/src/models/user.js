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

const User = mongoose.model("User", userSchema);

export default User;