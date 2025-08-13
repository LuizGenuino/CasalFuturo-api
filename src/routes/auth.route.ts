import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { validateSchema } from "../middlewares/validation.middleware";
import { forgotPasswordSchema, resetPasswordSchema, signInSchema, signUpSchema, verifyEmailSchema } from "../schemas/auth.schema";
import { verifyToken } from "../middlewares/auth.middleware";

const authRouter = Router()

// Import the AuthController
authRouter.post("/signup", validateSchema(signUpSchema, "body"), AuthController.signup);
authRouter.get("/me", verifyToken, AuthController.fetchCurrentUser);
authRouter.post("/verify-email", verifyToken, validateSchema(verifyEmailSchema, "body"), AuthController.verifyEmail)
authRouter.post("/resend-verification-email", verifyToken, AuthController.resendVerificationEmail)
authRouter.post("/signin", validateSchema(signInSchema, "body"), AuthController.signIn)
authRouter.post("/forgot-password", validateSchema(forgotPasswordSchema, "body"), AuthController.forgotPassword)
authRouter.post("/reset-password/", validateSchema(resetPasswordSchema, "body"), AuthController.resetPassword)

export default authRouter;