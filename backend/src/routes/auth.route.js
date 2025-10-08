import express from "express";

const router = express.Router();

router.get("/logout", (req,res) => {
    res.send("Logout");
})
router.get("/signup", (req,res)=>{
    res.send("Signed Up");
})
router.get("/login",(req,res)=>{
    res.send("Logged In");
})

export default router;
// This is ESM syntax exports.default was CJS syntax