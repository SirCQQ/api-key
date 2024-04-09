"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiKeyModel = void 0;
const mongoose_1 = require("mongoose");
const apikeySchema = new mongoose_1.Schema({
    tokens: { type: Number, required: true },
    user: { type: mongoose_1.Schema.ObjectId, ref: "User" },
    userId: { type: String },
});
exports.ApiKeyModel = mongoose_1.models.ApiKeys || (0, mongoose_1.model)("ApiKey", apikeySchema);
mongoose_1.models.ApiKey;
