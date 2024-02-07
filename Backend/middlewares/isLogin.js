import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

const isLogin = asyncHandler((req, res, next) => {
  if (!req?.user) {
    throw new ApiError(401, "Unauthorized");
  }
  return next();
});

export default isLogin;
