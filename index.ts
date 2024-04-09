import express, { Request, Response, Application } from "express";
import { json } from "body-parser";
import dbConnect from "./src/utils/db";
import { apiRouter } from "./src/routes";

const app: Application = express();
const port = process.env.PORT || 3000;
app.use(json());

app.use((req, res, next) => {
  console.log("request", req.url);
  next();
});

app.get("/", (req: Request, res: Response) => {
  return res.send("Welcome to Express & TypeScript Server");
});

app.use("/api", apiRouter);

app.listen(port, async () => {
  await dbConnect();
  console.log(`Server is Fire at http://localhost:${port}`);
});
