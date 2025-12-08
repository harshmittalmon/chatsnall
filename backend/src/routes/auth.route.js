import express from "express";
import { signup, login, logout, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { arcjetProtection } from "../middlewares/arcjet.middleware.js";
const router = express.Router();

router.use(arcjetProtection);
router.get("/test", arcjetProtection,(req,res)=>{
    return res.status(200).json({message: "Test route successfully made"});
})

router.post("/logout", logout )

router.post("/signup", signup )

router.post("/login", arcjetProtection, login ) 

router.put("/updateProfile",protectRoute,  updateProfile )

router.get("/check", protectRoute, (req,res)=> res.status(200).json(req.user));

export default router;