import { Router } from "express";

import {
  validateDeleteUrl,
  validateShortUrl,
  validateUrlId,
  validateUrlInput,
} from "../middlewares/urlsMiddleware.js";
import {
  deleteUrl,
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
urlRouter.delete(
  "/urls/:id",
  authenticateToken,
  validateUrlId,
  validateDeleteUrl,
  deleteUrl
);

export default urlRouter;
