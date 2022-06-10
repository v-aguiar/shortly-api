import { Router } from "express";

import {
  validateShortUrl,
  validateUrlId,
  validateUrlInput,
} from "../middlewares/urlsMiddleware.js";
import {
  fetchUrlData,
  redirectUrl,
  shortifyUrl,
} from "../controllers/urlsController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const urlRouter = Router();

urlRouter.post(
  "/urls/shorten",
  authenticateToken,
  validateUrlInput,
  shortifyUrl
);

urlRouter.get("/urls/open/:shortUrl", validateShortUrl, redirectUrl);
urlRouter.get("/urls/:id", validateUrlId, fetchUrlData);

export default urlRouter;
