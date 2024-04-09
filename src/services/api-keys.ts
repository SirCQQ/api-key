import { FilterQuery } from "mongoose";
import { ApiKeyModel } from "../models";
import { ApiKey } from "../types";
import { generateToken } from "../utils/utils";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

import type { Request } from "express";

const getApiKeyBy = async (
  filters: FilterQuery<ApiKey>
): Promise<ApiKey | null> => {
  const apikey = await ApiKeyModel.findOne(filters);
  if (!apikey) {
    return null;
  }
  return apikey;
};

const doesUserHasApiKeyWithName = async (
  user: string,
  name: string
): Promise<boolean> => {
  const apikey = await ApiKeyModel.findOne({ user, name });
  if (!apikey) {
    return false;
  }
  return true;
};

const createApiKey = async (apiKeyBody: Partial<ApiKey>): Promise<ApiKey> => {
  const key = `api_key_${generateToken()}`;

  const apiKey = await new ApiKeyModel({
    key: key,
    ...apiKeyBody,
  }).save();
  return apiKey;
};

const updateKey = async (apiKey: ApiKey) => {
  const updatedKey = await ApiKeyModel.findOneAndUpdate(
    { _id: apiKey._id },
    { numberOfTokens: apiKey.numberOfTokens - 1 }
  );
  if (!updatedKey) {
    throw new Error("No Api Key to update");
  }
  return updatedKey;
};

const canUseKey = async (apiKey: ApiKey): Promise<boolean> => {
  if (!apiKey) {
    throw new Error("No api key");
  }
  if (apiKey.numberOfTokens > 0) {
    return true;
  }
  return false;
};

const useKey = async (apiKey: ApiKey, user: string): Promise<ApiKey> => {
  if (!apiKey) {
    throw new Error("There is no key");
  }

  if (typeof apiKey.user === "string" && apiKey.user !== user) {
    throw new Error("User does not own the key");
  }

  if (!(await canUseKey(apiKey))) {
    throw new Error("No more uses");
  }

  const updatedKey = await updateKey(apiKey);

  return updatedKey;
};

const getKeyFromReq = async (key: string | string[] | undefined) => {
  console.log(key);
  if (!key) {
    throw new Error("Unauthorised");
  }
  if (typeof key !== "string") {
    throw new Error("Not a string");
  }

  const apiKey = await ApiKeyModel.findOne({ key: key });
  if (!apiKey) {
    throw new Error("Invalid Api key ");
  }
  return apiKey;
};

export {
  getApiKeyBy,
  doesUserHasApiKeyWithName,
  createApiKey,
  canUseKey,
  useKey,
  getKeyFromReq,
};
