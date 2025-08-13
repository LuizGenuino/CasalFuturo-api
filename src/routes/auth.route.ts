import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { validateSchema } from "../middlewares/validation.middleware";
import { signUpSchema } from "../schemas/auth.schema";
import { verifyToken } from "../middlewares/auth.middleware";

const authRouter = Router()

// Import the AuthController
authRouter.post("/signup", validateSchema(signUpSchema, "body"), AuthController.signup);
authRouter.get("/me", verifyToken, AuthController.fetchCurrentUser);

export default authRouter;