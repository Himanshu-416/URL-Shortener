import Url from "../models/url.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { nanoid } from "nanoid";
import ApiResponce from "../utils/ApiResponce.js";
import ApiError from "../utils/ApiError.js";

console.log(nanoid(6));

const createUrl = asyncHandler(async (req, res) => {
  //get the original URL
  const { url } = req.body;
  if (!url) {
    throw new ApiError(400, "Please provide a URL");
  }

  //create a unique short id
  const shortId = await nanoid(6);

  //store in database
  await Url.create({
    originalUrl: url,
    shortUrl: shortId,
  });

  res
    .status(201)
    .json(ApiResponce(201, "URL created successfully", { shortId }));
});

const redirectUrl = asyncHandler(async (req, res) => {
  const { shortId } = req.params;

  const url = await Url.findOne({ shortUrl: shortId });

  if (!url) {
    throw new ApiError(404, "URL not found");
  }

  return res.redirect(url.originalUrl);
});

export { createUrl, redirectUrl };
