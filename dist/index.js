"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const db_1 = __importDefault(require("./src/utils/db"));
const routes_1 = require("./src/routes");
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.use((0, body_parser_1.json)());
app.use((req, res, next) => {
    console.log("request", req.url);
    next();
});
app.get("/", (req, res) => {
    return res.send("Welcome to Express & TypeScript Server");
});
app.use("api", routes_1.apiRouter);
app.listen(port, async () => {
    await (0, db_1.default)();
    console.log(`Server is Fire at http://localhost:${port}`);
});
