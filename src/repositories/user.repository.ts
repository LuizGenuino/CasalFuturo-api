//userRepository.ts

import { Op } from "sequelize";
import { NotFoundError } from "../errors/notFound.error";
import { UserModel } from "../interfaces/user.interface";
import { User } from "../models"
import { logger } from "../utils/logger";

export class UserRepository {


    static async create(user: UserModel) {
        try {
            return await User.create(user)
        } catch (error) {
            logger.error("Erro ao criar usuário", error);
            throw new Error("Erro ao criar usuário: " + error.message);
        }
    }

    static async findAll() {
        try {
            return await User.findAll();
        } catch (error) {
            logger.error("Erro ao buscar usuários", error);
            throw new Error("Erro ao buscar usuários: " + error.message);
        }

    };

    static async findByEmail(email: string) {
        try {
            return await User.findOne({ where: { email: email } })
        } catch (error) {
            logger.error("Erro ao buscar usuário por email", error);
            throw new Error("Erro ao buscar usuário por email: " + error.message);

        }
    }

    static async findById(id: string) {
        try {
            return await User.findOne({ where: { id: id } })
        } catch (error) {
            logger.error("Erro ao buscar usuário por ID", error);
            throw new Error("Erro ao buscar usuário por ID: " + error.message);

        }
    }

    static async findByVerificationCode(verificationCode: string) {
        try {
            return await User.findOne({
                where: {
                    [Op.and]: [
                        { verificationCode: verificationCode },
                        {
                            verificationCodeExpiresAt: {
                                [Op.gt]: new Date()
                            }
                        }
                    ]
                }
            });
        } catch (error) {
            logger.error("Erro ao buscar usuário por código de verificação", error);
            throw new Error("Erro ao buscar usuário por código de verificação: " + error.message);

        }
    }

    static async findByResetPasswordToken(resetPasswordToken: string) {
        try {
            return await User.findOne({
                where: {
                    [Op.and]: [
                        { resetPasswordToken: resetPasswordToken },
                        {
                            resetPasswordExpiresAt: {
                                [Op.gt]: new Date()
                            }
                        }
                    ]
                }
            });
        } catch (error) {
            logger.error("Erro ao buscar usuário por token de redefinição de senha", error);
            throw new Error("Erro ao buscar usuário por token de redefinição de senha: " + error.message);

        }
    }

    static async update(id: string, userData: Partial<UserModel>) {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                logger.error("Usuário não encontrado");
                throw new NotFoundError("Usuário não encontrado");
            };
            return await user.update(userData);
        } catch (err) {
            throw new Error("Erro ao atualizar usuário: " + err.message);
        }
    };


    static async remove(id) {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                logger.error("Usuário não encontrado");
                throw new NotFoundError("Usuário não encontrado");
            };
            await user.destroy();
            return true;
        } catch (error) {
            logger.error("Erro ao remover usuário", error);
            throw new Error("Erro ao remover usuário: " + error.message);
        }
    };
}


