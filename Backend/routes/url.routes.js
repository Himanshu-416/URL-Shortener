import { Router } from "express";
import { createUrl, redirectUrl } from "../controllers/url.controller.js";

const router = Router();

router.route("/").post(createUrl);
router.routes("/:shortId").get(redirectUrl);

export default router;
