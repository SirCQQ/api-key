import type { Request, Response, NextFunction } from "express";
import { getUserFromRequest } from "../services/auth";
import { getKeyFromReq, useKey } from "../services/api-keys";

export const apiKeyMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userToken = req.headers["token"];
    const apiToken = req.headers["api-key"];

    const user = await getUserFromRequest(userToken);
    const apiKey = await getKeyFromReq(apiToken);
    await useKey(apiKey, user._id);
  } catch (e) {
    const error = e as Error;
    res.status(400).json({ message: error.message, ok: false });
  }
  next();
};
