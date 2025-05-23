//userRepository.ts

import { NotFoundError } from "../errors/notFound.error";
import User from "../models/User"
import { UserModel } from "../types/user.types";
import { logger } from "../utils/logger";

export const create = async (user: UserModel) => {
    try {
        return await User.create(user)
    } catch (error) {
        logger.error("Erro ao criar usuário", error);
        throw new Error("Erro ao criar usuário: " + error.message);
    }
}

export const findAll = async () => {
    try {
        return await User.findAll();
    } catch (error) {
        logger.error("Erro ao buscar usuários", error);
        throw new Error("Erro ao buscar usuários: " + error.message);
    }

};

export const findByEmail = async (email: string) => {
    try {
        return await User.findOne({ where: { email: email } })
    } catch (error) {
        logger.error("Erro ao buscar usuário por email", error);
        throw new Error("Erro ao buscar usuário por email: " + error.message);

    }
}

export const findById = async (id: string) => {
    try {
        return await User.findOne({ where: { id: id } })
    } catch (error) {
        logger.error("Erro ao buscar usuário por ID", error);
        throw new Error("Erro ao buscar usuário por ID: " + error.message);

    }
}

export const findByVerificationCode = async (verificationCode: string) => {
    try {
        return await User.findOne({ where: { verificationCode: verificationCode } })
    } catch (error) {
        logger.error("Erro ao buscar usuário por código de verificação", error);
        throw new Error("Erro ao buscar usuário por código de verificação: " + error.message);

    }
}

export const findByResetPasswordToken = async (resetPasswordToken: string) => {
    try {
        return await User.findOne({ where: { resetPasswordToken: resetPasswordToken } })
    } catch (error) {
        logger.error("Erro ao buscar usuário por token de redefinição de senha", error);
        throw new Error("Erro ao buscar usuário por token de redefinição de senha: " + error.message);

    }
}

export const update = async (id: string, userData: Partial<UserModel>) => {
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


export const remove = async (id) => {
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


