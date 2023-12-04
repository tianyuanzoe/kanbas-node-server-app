import express from 'express';
import HelloRoutes from './hello.js';
import Lab5 from './Lab5.js';
import cors from "cors";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import AssignmentRoutes from "./assignments/routes.js";
import "dotenv/config";
import mongoose from "mongoose";
import UserRoutes from "./users/routes.js";
import session from "express-session";
// const express = require('express');
const app = express();
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas';
mongoose.connect(CONNECTION_STRING);
app.use(cors({credentials: true, origin: process.env.FRONTEND_URL}));
const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false
};


if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true
    };
}

app.use(session(sessionOptions));

app.use(express.json());
CourseRoutes(app);
HelloRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
Lab5(app);
UserRoutes(app);
app.listen(process.env.PORT || 4000);
