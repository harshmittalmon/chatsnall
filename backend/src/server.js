    // const express =  require("express"); 
    import express from 'express';
    // ESM syntax 
    import cookieParser from 'cookie-parser';
    import path from 'path';
    import cors from "cors";
    import authRoutes from "./routes/auth.route.js";
    import messageRoutes from "./routes/message.route.js";
    import {ENV} from "../src/lib/env.js";
    // DOTENV FILE REQUIREMENTS
    import dotenv from 'dotenv';
    import { connectDB } from './lib/db.js';
    dotenv.config();

    //payload too large error can occur without setting the limit as by default the 
    // limit for json payload is only 50kb
    const app = express({});
    app.use(express.json());
    app.use(cors({origin: ENV.CLIENT_URL, credentials: true}));
    app.use(cookieParser());

    const __dirname = path.resolve();

    
    const PORT = process.env.PORT || 5000;

    app.use("/api/auth/", authRoutes);
    app.use("/api/message/", messageRoutes);

    // app.get("/", (req, res) => { res.send("You are on the Home Page :) "); });

    if (process.env.NODE_ENV === "production") {
        app.use(express.static(path.join(__dirname, "../frontend/dist")));
        //   app.get("/*", (req, res) => {
        //   res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
        //      });
        // Before this line was giving error as this was used in v4 (express) In v5, * by itself throws a PathError: Missing parameter name, which is what you’re seeing.
        // But now i used app.use and its okay now.
        app.use((req, res) => {
            res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
        });

    }

    app.listen(PORT, () => {
        console.log("Hey, I am here on PORT : ", PORT);
        connectDB();
    })