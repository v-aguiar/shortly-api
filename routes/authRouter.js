import { Router } from "express";

import { signIn, signUp } from "../controllers/authControllers.js";
import { validateSignIn } from "../middlewares/authMiddleware.js";

const authRouter = Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", validateSignIn, signIn);

export default authRouter;
