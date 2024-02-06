import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";

const isLogin = asyncHandler((req, res, next) => {
  if (!req?.user) {
    return res.json({ authetication: false });
  }
  return next();
});

export default isLogin;
