import { userRouter } from "./user";
import { apiKeyRouter } from "./api-key";
import express, { Request, Response } from "express";
import { testRouter } from "./test";
import { auth } from "../middleware";
import { apiKeyMiddleWare } from "../middleware/api-key";

const apiRouter = express.Router();

apiRouter.use("/user", userRouter);
apiRouter.use("/api-key", apiKeyRouter);
apiRouter.use("/test", auth, apiKeyMiddleWare, testRouter);

apiRouter.get("/", (req: Request, res: Response) => {
  return res.send("Welcome to /api Express & TypeScript Server pula");
});

export { apiRouter };
