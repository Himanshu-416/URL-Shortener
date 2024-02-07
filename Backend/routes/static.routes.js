import { Router } from "express";
import { createUrl, redirectUrl } from "../controllers/url.controller.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponce from "../utils/ApiResponce.js";

const router = Router();

router.route("/").get(asyncHandler(async (req, res) => {
  const user = req.user
  res.status(200).json(new ApiResponce(200,"Ok",user))
}));;

export default router;
