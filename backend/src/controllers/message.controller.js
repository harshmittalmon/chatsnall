import cloudinary from "../lib/cloudinary.js";
import Message from "../models/Message.js";
import User from "../models/user.js";

export const getAllContacts = async (req, res) => {
    try {
        const loggedInUser = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUser } }).select("-password");
        res.status(200).json(filteredUsers);
    }
    catch (error) {
        console.log("Error in getting contacts: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getMessagesByUserId = async (req, res) => {
    try {
        const myId = req.user._id;
        const userToChatId = req.params.id;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ],
        });

        res.status(200).json(messages);
    }
    catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const sendMessage = async (req, res) => {
    try {
        const senderId = req.user._id;
        const receiverId = req.params.id;
        const img = req.body.image;
        const text = req.body.text;

        if( !text && !image){
            return res.status(400).json({message: "Text or image is required"});
        }
        if( senderId.equals(receiverId  )){
            return res.status(400).json({message: "Can't send message to yourself"});
        }
        const receiverExists = await User.exists({ _id: receiverId  });
        if ( !receiverExists){
            return res.status(400).json({message: "Receiver not found"});
        }


        let imgUrl;
        if (img) {
            const uploadResponse = await cloudinary.uploader.upload(img);
            imgUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imgUrl,
        });

        await newMessage.save();

        // todo - send Message in real time if user is online -socket.io    

        res.status(201).json(newMessage);
    }
    catch (error) {
        console.log("Error in sendMessage controller : ", error.message);
        res.status(500).json({ error: "Internal server error" });

    }
}


export const getChatPartners = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        // find all the messages where the loggin in user is either sender or receiver
        const messages = await Message.find({
            $or: [
                { senderId: loggedInUserId },
                { receiverId: loggedInUserId }
            ]
        })

        const getChatPartnerIds = [...new Set(
            messages.map(
                (msg) => {
                    return msg.senderId.toString() === loggedInUserId.toString() ?
                    msg.receiverId.toString() : msg.senderId.toString();
                }
            )
        )];

        const chatPartners = await User.find({_id: {$in: getChatPartnerIds} }).select("-password");
        res.status(200).json(chatPartners);

    } catch (error) {
        console.log("Error in getChatPartners: ", error.message);
        res.status(500).json({error: "Internal server error"});
        
    }   
}