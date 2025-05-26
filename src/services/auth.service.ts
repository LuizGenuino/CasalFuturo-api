
import { UserModel } from "../interfaces/user.interface"
import { logger } from "../utils/logger"
import { generateVerificationToken } from "../utils/auth.utils"
import { UserRepository } from "../repositories/user.repository"
import { BadRequestError } from "../errors/badRequest.error"

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
}