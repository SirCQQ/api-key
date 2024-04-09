import { User } from "./user";

export type ApiKey = {
  _id: string;
  user: User;
  numberOfTokens: number;
  key: string;
  name: string;
};
