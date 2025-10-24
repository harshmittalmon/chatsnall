import express from "express";
import { signup } from "../controllers/auth.controller.js";
const router = express.Router();

router.get("/logout", (req,res) => {
    res.send("Logout");
})
router.post("/signup", signup)
router.get("/login",(req,res)=>{
    res.send("Logged In");
})

export default router;
// This is ESM syntax exports.default was CJS syntax