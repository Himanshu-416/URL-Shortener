import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/user.model.js";
import ApiResponce from "../utils/ApiResponce.js";

const registerUser = asyncHandler(async (req, res) => {

  //get data from request
  const { username, email, password } = req.body;

  console.log(username, email, password);

  //validate the data
  if ([username, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  //check if user already exists
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(400, "User already exists");
  }

  //create user
  const user = await User.create({
    username: username?.toLowerCase(),
    email: email?.toLowerCase(),
    password,
  });

  if (!user) {
    throw new ApiError(500, "Failed to create user");
  }

  res.status(201).json(new ApiResponce(201, "User created", {_id: user._id, username: user.username, email: user.email}));

});

export { registerUser };
