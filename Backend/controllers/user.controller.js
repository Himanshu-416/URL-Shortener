import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/user.model.js";
import ApiResponce from "../utils/ApiResponce.js";

const registerUser = asyncHandler(async (req, res, next) => {
  //get data from request
  const { username, email, password } = req.body;

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

  res
    .status(201)
    .json(
      new ApiResponce(201, "User created", {
        _id: user._id,
        username: user.username,
        email: user.email,
      })
    );
});

const loginUser = asyncHandler(async (req, res) => {
  //get data from request
  const { email, password } = req.body;

  //validate the data
  if ([email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  //find user using email
  const user = await User.findOne({ email })

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  //match password
  const isPasswordMatch = await user.isPasswordMatch(password);

  //generate token
  const token = user.generateToken();

  console.log(token);

  //set token in cookie
  res.cookie("token", token)

  //set user in header
  req.user = user

  //send responce
  res.status(200).json(new ApiResponce(200, "User logged in successfully", { _id: user._id, username: user.username, email: user.email }));
});

const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token")

  res.status(200).json(new ApiResponce(200, "User logged out successfully", null))
})

export { registerUser, loginUser, logoutUser };
