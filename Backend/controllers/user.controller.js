import asyncHandler from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  return res.status(200).send({
    message: "Register User Succesfully",
  });
});

export { registerUser };
