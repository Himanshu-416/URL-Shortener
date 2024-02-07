import jwt from "jsonwebtoken";

const Auth = async (req, res, next) => {
  if (req?.user) { return next()};

  const token = req?.cookies?.token;

  if (!token) { return next()};

  const user = jwt.verify(token, process.env.JWT_SECRET);

  req.user = user;

   return next();
};

export default Auth;
