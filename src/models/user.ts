import { Schema, model, models } from "mongoose";
import type { Model } from "mongoose";
import { User } from "../types";
export type UserM = Model<User>;

const userSchema = new Schema<User>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
});

export const UserModel =
  (models.Users as UserM) || model<User, UserM>("User", userSchema);
models.User;
