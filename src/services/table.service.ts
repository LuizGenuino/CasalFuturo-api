import { randomBytes } from "crypto";
import { BadRequestError } from "../errors/badRequest.error";
import { InvestmentTableModel } from "../interfaces/investmentTable.interface";
import { TableRepository } from "../repositories/table.repository";
import { UserRepository } from "../repositories/user.repository";
import { logger } from "../utils/logger";
import { NotFoundError } from "../errors/notFound.error";

export class InvestmentTableService {
    static async create(table: InvestmentTableModel, userId: string): Promise<any> {
        const tableExist = await TableRepository.findByUserId(userId)

        logger.info("Checking if the user already has an investment table", { user_id: userId });
        if (tableExist) {
            logger.error("The user already has an investment table", { user_id: userId });
            throw new BadRequestError("O usuário já uma tabela de investimento");
        }

        table.creatorId = userId;
        logger.info("Creating investment table", { ...table, user_id: userId, });
        return await TableRepository.create(table);
    }

    static async getCurrentUserTable(userId: string): Promise<any> {
        const tableExist = await TableRepository.findByUserId(userId)
        logger.info("Checking if the user has an investment table", { user_id: userId });
        if (!tableExist) {
            logger.error("The user does not have an investment table", { user_id: userId });
            throw new BadRequestError("O usuário não possui uma tabela de investimentos");
        }

        return tableExist;
    }

    static async inviteUser(email: string, tableInvitationToken: string): Promise<any> {
        const user = await UserRepository.findByEmail(email)
        if (!user) {
            logger.debug("User not found", { email })
            throw new BadRequestError("Email ou Senha Invalidos")
        }

        if (!user.isVerified) {
            logger.debug("User not verified", { email })
            throw new BadRequestError("Usuario não Verificado")
        }

        const tableExist = await TableRepository.findByUserId(user.id)
        if (tableExist) {
            logger.error("The user already has an investment table", { user_id: user.id });
            throw new BadRequestError("O usuário já uma tabela de investimento");
        }

        logger.info("Sending Invite email");

        const userUpdate = {
            tableInvitationToken: tableInvitationToken,
        }

        return await UserRepository.update(user.id, userUpdate);
    }

    static async acceptInvitation(tableInvitationToken: string): Promise<any> {
        const user = await UserRepository.findByTableInvitationToken(tableInvitationToken);
        logger.info("Checking if user exists", { tableInvitationToken });
        if (!user) {
            logger.debug("Invalid or expired table Invitation Token", { tableInvitationToken })
            throw new NotFoundError("Token de convite inválido ou expirado")
        }
        
        const table = await TableRepository.acceptInvitation(tableInvitationToken, user.id)

        const userUpdate = {
            tableInvitationToken: undefined,
            tableInvitationExpiresAt: undefined
        }


        await UserRepository.update(user.id, userUpdate);

        return table
    }

}