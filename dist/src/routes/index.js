"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const user_1 = require("./user");
const api_key_1 = require("./api-key");
const express_1 = __importDefault(require("express"));
const apiRouter = express_1.default.Router();
exports.apiRouter = apiRouter;
apiRouter.use("/user", user_1.userRouter);
apiRouter.use("/api-key", api_key_1.apiKeyRouter);
apiRouter.get("/", (req, res) => {
    return res.send("Welcome to Express & TypeScript Server");
});
