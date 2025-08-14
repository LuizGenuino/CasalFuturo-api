
import { UserModel } from "../interfaces/user.interface"
import { logger } from "../utils/logger"
import { generateVerificationToken } from "../utils/auth.utils"
import { UserRepository } from "../repositories/user.repository"
import { BadRequestError } from "../errors/badRequest.error"
import { NotFoundError } from "../errors/notFound.error"
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto"

export class AuthService {
    static async register(user: UserModel): Promise<any> {
        const userExists = await UserRepository.findByEmail(user.email);
        logger.info("Checking if user exists", { email: user.email });
        if (userExists) {
            logger.error("User already exists with this email", { email: user.email });
            throw new BadRequestError("O usuário com este Email já existe");
        }

        user.verificationCode = generateVerificationToken()
        logger.info("verificationCode generated", { verificationCode: user.verificationCode });

        return await UserRepository.create(user);
    }

    static async update(id: string, userData: Partial<UserModel>): Promise<any> {

        return await UserRepository.update(id, userData);
    }

    static async signIn(email: string, password: string): Promise<any> {
        const user = await UserRepository.findByEmail(email)
        if (!user) {
            logger.debug("User not found", { email })
            throw new BadRequestError("Email ou Senha Invalida")
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
            logger.debug("Invalid credentials", { email })
            throw new BadRequestError("Email ou Senha Invalida")
        }

        if (!user.isVerified) {
            logger.debug("User not verified", { email })
            throw new BadRequestError("Usuário não verificado")
        }

        return await UserRepository.update(user.id, { lastLogin: new Date() });
    }

    static async getCurrentUser(userId: string): Promise<any> {
        const userExists = await UserRepository.findById(userId);
        logger.info("Checking if user exists", { id: userId });
        if (!userExists) {
            logger.error("User not found", { id: userId });
            throw new NotFoundError("Usuário não encontrado");
        }

        return userExists;
    }

    static async verifyEmail(verificationCode: string): Promise<any> {
        const user = await UserRepository.findByVerificationCode(verificationCode);
        logger.info("Checking if user exists", { verificationCode });
        if (!user) {
            logger.debug("Invalid or expired verification token", { verificationCode })
            throw new NotFoundError("Código de verificação inválido ou expirado")
        }

        const userUpdate = {
            isVerified: true,
            verificationCode: undefined,
            verificationCodeExpiresAt: undefined
        }

        return await UserRepository.update(user.id, userUpdate);
    }

    static async resendVerificationEmail(user: UserModel): Promise<any> {


        const userUpdate = {
            verificationCode: generateVerificationToken(),
        }

        return await UserRepository.update(user.id, userUpdate);
    }

    static async forgotPassword(email: string): Promise<any> {
        const user = await UserRepository.findByEmail(email)
        if (!user) {
            logger.debug("User not found", { email })
            throw new BadRequestError("Email ou Senha Invalidos")
        }

        if (!user.isVerified) {
            logger.debug("User not verified", { email })
            throw new BadRequestError("Usuario não Verificado")
        }


        const resetToken = randomBytes(16).toString("hex");
        logger.info("Reset token generated", { resetToken })
        logger.info("Sending password reset email");

        const userUpdate = {
            resetPasswordToken: resetToken,
        }

        return await UserRepository.update(user.id, userUpdate);
    }

    static async resetPassword(newPassword: string, resetPasswordToken: string): Promise<any> {
        const user = await UserRepository.findByResetPasswordToken(resetPasswordToken);
        logger.info("Checking if user exists", { resetPasswordToken });
        if (!user) {
            logger.debug("Invalid or expired verification token", { resetPasswordToken })
            throw new NotFoundError("Token de verificação inválido ou expirado")
        }

        const userUpdate = {
            password: newPassword,
            resetPasswordToken: undefined,
            resetPasswordExpiresAt: undefined
        }

        return await UserRepository.update(user.id, userUpdate);
    }






}