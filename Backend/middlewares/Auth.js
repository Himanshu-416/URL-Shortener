import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";

const Auth = asyncHandler((req, res, next) => {
  if (req.user) return next();

  const token = req?.cookies?.token;

  const user = jwt.verify(token, process.env.JWT_SECRET);

  req.user = user;

  return next();
});

export default Auth;
