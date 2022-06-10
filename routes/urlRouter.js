import { Router } from "express";

import { authenticateToken } from "../middlewares/authMiddleware.js";
import { validateUrlInput } from "../middlewares/urlsMiddleware.js";
import { shortifyUrl } from "../controllers/urlsController.js";

const urlRouter = Router();

urlRouter.post(
  "/urls/shorten",
  authenticateToken,
  validateUrlInput,
  shortifyUrl
);

export default urlRouter;
