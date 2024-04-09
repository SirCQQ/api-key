import dotenv from "dotenv";
import { join } from "path";

dotenv.config({});

type Config = {
  mongoUri: string;
  env?: string;
};

if (!process.env.MONGO_DB_URL) {
  throw new Error(`Env variable 'MONGODB_URL' is missing`);
}

export const config: Config = {
  mongoUri: process.env.MONGO_DB_URL,
};
