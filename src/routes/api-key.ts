import { Router } from "express";
import { auth } from "../middleware";
import type { Request, Response } from "express";
import { UserModel } from "../models";
import {
  createApiKey,
  doesUserHasApiKeyWithName,
  getKeyFromReq,
} from "../services/api-keys";
import { apiKeyMiddleWare } from "../middleware/api-key";

export const apiKeyRouter = Router();

apiKeyRouter.get("/", auth, (req: Request, res: Response) => {
  res.json({ ok: true });
});

apiKeyRouter.post("/get-token", auth, async (req: Request, res: Response) => {
  const body = req.body;

  const userId = req.headers["token"];
  const user = await UserModel.findById(userId);

  if (await doesUserHasApiKeyWithName(user?._id!, body.name)) {
    return res
      .status(400)
      .json({ ok: false, message: "User already has a key with that name" });
  }

  const apiKey = await createApiKey({
    user: user!,
    numberOfTokens: body.numberOfTokens,
    name: body.name,
  });
  return res.json({ apiKey });
});

apiKeyRouter.get(
  "/current-key",
  auth,

  async (req: Request, res: Response) => {
    try {
      const apiKey = await getKeyFromReq(req.headers["api-key"]);
      return res.json(apiKey);
    } catch (e) {
      res.status(400).json({ ok: false, message: "Fail" });
    }
  }
);
