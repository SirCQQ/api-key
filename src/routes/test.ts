import { Router } from "express";

export const testRouter = Router();

testRouter.get("/", (req, res) => {
  res.json({ ok: true, message: "Api key used" });
});
