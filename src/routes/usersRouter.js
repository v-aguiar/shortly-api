import { Router } from "express";

import { authenticateToken } from "../middlewares/authMiddleware.js";
import { validateUserData } from "../middlewares/usersMiddleware.js";
import { fetchRanking, fetchUserData } from "../controllers/usersController.js";

const usersRouter = Router();

usersRouter.get(
  "/users/:id",
  authenticateToken,
  validateUserData,
  fetchUserData
);
usersRouter.get("/ranking", fetchRanking);

export default usersRouter;
