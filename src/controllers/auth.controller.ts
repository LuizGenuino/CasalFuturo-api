import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import { AuthService } from "../services/auth.service";
import { logger } from "../utils/logger";
import { sendResetPasswordEmail, sendResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from "../providers/email/mailtrap.provider";
import { UserDTO } from "../DTOs/user.dto";
import { generateJWT, generateVerificationToken } from "../utils/auth.utils";
import { NotFoundError } from "../errors/notFound.error";
import { BadRequestError } from "../errors/badRequest.error";


export class AuthController {
    static signup = asyncHandler(async (req: Request, res: Response) => {
        const data = req.body;
        const user = await AuthService.register(data);
        logger.info("User registered successfully", { email: user.email });

        logger.info("Gerenating JWT Token");
        const token = generateJWT(user.id.toString());

        logger.info("Seding verfication code to user", { email: user.email });
        await sendVerificationEmail(user.email, user.verificationCode);



        res.status(201).json({
            message: "User created successfully",
            data: UserDTO.toJson(user),
            token: `Bearer ${token}`
        });
    });

    static fetchCurrentUser = asyncHandler(async (req: Request, res: Response) => {
        const user = await AuthService.getCurrentUser(req.userId)

        res.status(200).json({ success: true, message: "User fetched successfully", data: UserDTO.toJson(user) })
    })

    static verifyEmail = asyncHandler(async (req: Request, res: Response) => {
        const { verificationCode } = req.body;
        const user = await AuthService.verifyEmail(verificationCode)

        logger.info("Going to save the user after email verification")

        await sendWelcomeEmail(user.email, user.name);

        res.status(200).json({ success: true, message: "Email verified successfully", data: UserDTO.toJson(user) })
    })

    static resendVerificationEmail = asyncHandler(async (req: Request, res: Response) => {
        const user = await AuthService.getCurrentUser(req.userId);
        logger.info("Resending verification email", { userId: user?.id })

        if (user.isVerified) {
            logger.debug("User already verified", { userId: user?.id })
            throw new BadRequestError("User already verified")
        }

        const code = { verificationCode: generateVerificationToken() };

        await AuthService.update(user.id, code)

        logger.info("Sending verification email");
        await sendVerificationEmail(user.email, code.verificationCode);
        res.status(200).json({ success: true, message: "Verification email sent successfully" })
    })

    static signIn = asyncHandler(async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const user = await AuthService.signIn(email, password)

        logger.info("Generating JWT Token");
        const token = generateJWT(user.id.toString());

        res.status(200).json({ success: true, message: "User signed in successfully", data: UserDTO.toJson(user), token: `Bearer ${token}` })
    })

    static forgotPassword = asyncHandler(async (req: Request, res: Response) => {
        const { email } = req.body;
        logger.info("Started to reset password", { email })
        const user = await AuthService.forgotPassword(email)

        logger.info("Sending password reset email");
        await sendResetPasswordEmail(email, user.resetPasswordToken);

        res.status(200).json({ success: true, message: "Password reset email sent successfully" })
    })

    static resetPassword = asyncHandler(async (req: Request, res: Response) => {
        const { password, resetPasswordToken } = req.body;

        logger.info("Started to reset password", { resetPasswordToken })

        const user = await AuthService.resetPassword(password, resetPasswordToken)

        logger.info("Password reset successfully", { userId: user.id })

        await sendResetSuccessEmail(user.email);
        logger.info("Sending password reset success email", { userId: user.id })

        res.status(200).json({ success: true, message: "Password reset successfully" })
    })
}