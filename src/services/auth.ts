import type { Request } from "express";
import { UserModel } from "../models";
import mongoose from "mongoose";
import { User } from "../types";
const ObjectId = mongoose.Types.ObjectId;

export const getUserFromRequest = async (
  token: string | string[] | undefined
): Promise<User> => {
  if (!token) {
    throw new Error("Unauthorised");
  }
  if (typeof token === "string" && !ObjectId.isValid(token)) {
    throw new Error("Invalid token");
  }

  const user = await UserModel.findById(token);
  if (!user) {
    throw new Error("Invalid user ");
  }
  return user;
};
