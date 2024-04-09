"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const models_1 = require("../models");
exports.userRouter = (0, express_1.Router)();
//Create a user
exports.userRouter.post("/register", async (req, res) => {
    const user = req.body;
    if (!user.email || !user.password || !user.username) {
        return res.status(400).json({ ok: false, message: "Invalid Body" });
    }
    const newUser = new models_1.UserModel({ ...user });
    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
});
exports.userRouter.get("/", (req, res) => {
    return res.send("Test");
});
