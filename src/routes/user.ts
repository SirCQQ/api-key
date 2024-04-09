import { Router } from "express";
import { User } from "../types";
import { UserModel } from "../models";
import type { Request, Response } from "express";
export const userRouter = Router();

//Create a user
userRouter.post("/register", async (req: Request, res: Response) => {
  const user: User = req.body;
  if (!user.email || !user.password || !user.username) {
    return res.status(400).json({ ok: false, message: "Invalid Body" });
  }
  const dbUser = await UserModel.findOne({ email: user.email });
  if (dbUser) {
    return res
      .status(402)
      .json({ ok: false, message: "Email already existing" });
  }
  const newUser = new UserModel({ ...user });
  const savedUser = await newUser.save();
  return res.status(201).json({ user: savedUser, ok: true });
});

userRouter.post("/login", async (req: Request, res: Response) => {
  const body = req.body;
  const user = await UserModel.findOne({
    $or: [{ email: body.email }, { username: body.username }],
  });
  if (!user) {
    return res.status(402).json({ message: "Invalid email", ok: false });
  }
  if (user.password !== body.password) {
    return res.status(402).json({ message: "Invalid password", ok: false });
  }

  return res.status(200).json({ ok: true, user });
});

userRouter.get("/", (req, res) => {
  return res.send("Test");
});
