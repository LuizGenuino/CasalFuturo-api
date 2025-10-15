import { BadRequestError } from "../errors/badRequest.error";
import { InvestmentTableModel } from "../interfaces/investmentTable.interface";
import { TableRepository } from "../repositories/table.repository";
import { logger } from "../utils/logger";

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
}