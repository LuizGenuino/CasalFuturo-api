
import { UserModel } from "../interfaces/user.interface"
import { logger } from "../utils/logger"
import { generateVerificationToken } from "../utils/auth.utils"
import { UserRepository } from "../repositories/user.repository"
import { BadRequestError } from "../errors/badRequest.error"
import { NotFoundError } from "../errors/notFound.error"
import { Request, Response } from "express"

export class AuthService {
    static async register(user: UserModel): Promise<any> {
        const userExists = await UserRepository.findByEmail(user.email);
        logger.info("Checking if user exists", { email: user.email });
        if (userExists) {
            logger.error("User already exists with this email", { email: user.email });
            throw new BadRequestError("User already exists with this email");
        }

        user.verificationCode = generateVerificationToken()
        logger.info("verificationCode generated", { verificationCode: user.verificationCode });

        return await UserRepository.create(user);
    }

    static async getCurrentUser(req: Request): Promise<any> {
        const userExists = await UserRepository.findById(req.userId);
        logger.info("Checking if user exists", { id: req.userId });
        if (!userExists) {
            logger.error("User not found", { id: req.userId });
            throw new NotFoundError("User not found");
        }

        return userExists;
    }
}