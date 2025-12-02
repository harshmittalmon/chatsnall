import User from "../models/user.js";
import { generateToken } from "../lib/utils.js";
import bcrypt from "bcryptjs"
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import cloudinary from "../lib/cloudinary.js";
export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required!!" });
        }

        if (password.length < 4) {
            return res.status(400).json({ message: " Password length should be at least 4! " });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });


        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName, email, password: hashedPass
        })

        if (newUser) {
            // generateToken(newUser._id, res);
            // await newUser.save();

            // first persist the issue the auth cookie
            const savedUser = await newUser.save();
            generateToken(savedUser._id, res);

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });


            try {
                await sendWelcomeEmail(savedUser.email, savedUser.fullName, process.env.CLIENT_URL);
            } catch (err) {
                console.log("Failed to send welcome email : ", err);

            }
        }
        else {
            res.status(400).json({ message: "invalid user data" });
        }

    }
    catch (error) {
        console.log("Error in signup controller ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
    }

    console.log(email);
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid Credentials" });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credentials" });

        generateToken(user._id, res);

        return res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        })

    }
    catch (error) {
        console.log("Error in login controller: ", error);
        return res.status(500).json({ message: "Internal Server Error" });

    }

}

export const logout = async (_, res) => {
    res.cookie("jwt", "", { maxAge: 0 })
    res.status(200).json({ message: "Logged out Successfully" })
}

export const updateProfile = async (req, res ) => {
    try{
        const {profilePic} = req.body ;
        if( !profilePic ) return  res.status(400).json({message: "Profile Pic is required"})
        const userId = req.user._id;
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId, {profilePic: uploadResponse.secure_url }, {new:true});
        res.status(200).json(updatedUser);
    }
    catch(error){
        console.log("Error in update Profile", error);
        res.status(500).json({message : "Internal Server Error"});
    }   
}