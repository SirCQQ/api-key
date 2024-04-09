import { Schema, model, models } from "mongoose";
import type { Model } from "mongoose";
import { ApiKey } from "../types";
export type ApiKeyM = Model<ApiKey>;

const apikeySchema = new Schema<ApiKey>({
  numberOfTokens: { type: Number, required: true },
  user: { type: Schema.ObjectId, ref: "User" },
  key: { type: String, required: true },
  name: { type: String, required: true },
});

export const ApiKeyModel =
  (models.ApiKeys as ApiKeyM) || model<ApiKey, ApiKeyM>("ApiKey", apikeySchema);
models.ApiKey;
