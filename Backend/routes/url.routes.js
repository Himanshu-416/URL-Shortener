import { Router } from "express";
import { createUrl, redirectUrl } from "../controllers/url.controller.js";
import isLogin from "../middlewares/isLogin.js";

const router = Router();

router.route("/").post(isLogin,createUrl);
router.route("/:shortId").get(redirectUrl);

export default router;
