import type { Request, Response, NextFunction } from "express";
import { getUserFromRequest } from "../services/auth";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getUserFromRequest(req.headers["token"]);
  } catch (e) {
    const error = e as Error;
    res.status(400).json({ message: error.message, ok: false });
  }
  next();
};
