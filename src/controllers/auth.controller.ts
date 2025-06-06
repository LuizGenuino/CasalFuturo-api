import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import { AuthService } from "../services/auth.service";
import { logger } from "../utils/logger";
import { sendVerificationEmail } from "../providers/email/mailtrap.provider";
import { UserDTO } from "../DTOs/user.dto";
import { generateJWT, setTokenCookie } from "../utils/auth.utils";


export class AuthController {
    static signup = asyncHandler(async (req: Request, res: Response) => {
        const data = req.body;
        const user = await AuthService.register(data);
        logger.info("User registered successfully", { email: user.email });

        logger.info("Gerenating JWT Token and setting cookie");
        const token = generateJWT(user.id.toString());
        setTokenCookie(res, token);

        logger.info("Seding verfication code to user", { email: user.email });
        await sendVerificationEmail(user.email, user.verificationCode);



        res.status(201).json({
            message: "User created successfully",
            data: UserDTO.toJson(user),
        });
    });
}