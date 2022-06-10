import { Router } from "express";

import {
  validateShortUrl,
  validateUrlInput,
} from "../middlewares/urlsMiddleware.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { redirectUrl, shortifyUrl } from "../controllers/urlsController.js";

const urlRouter = Router();

urlRouter.post(
  "/urls/shorten",
  authenticateToken,
  validateUrlInput,
  shortifyUrl
);

urlRouter.get("/urls/open/:shortUrl", validateShortUrl, redirectUrl);

export default urlRouter;
