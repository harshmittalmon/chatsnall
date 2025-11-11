import jwt from "jsonwebtoken"

export const generateToken = (userId, res) =>{
    const {JWT_SECRET} = process.env;
    if( !JWT_SECRET){
        throw new Error("JWT_SECRET is not configured");
    }
    const token =  jwt.sign({userId}, JWT_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("jwt", token , {
        maxAge: 7* 24 * 60 * 60 * 1000,
        httpOnly: true, // prevent XSS ATTACKS: CROSS SITE SCRIPTING ANYONE CANT ACCESS VIA SIMPLE JS PROGRAM HE MUST ACCESS THIS TOKEN VIA HTTP ONLY 
        sameSite: "strict", // CSRF attack 
        secure:  process.env.NODE_ENV === "development"?false: true,
    })
    return token;
}