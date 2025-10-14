import { BadRequestError } from "../errors/badRequest.error";
import { InvestmentTableModel } from "../interfaces/investmentTable.interface";
import { TableRepository } from "../repositories/table.repository";
import { logger } from "../utils/logger";

export class InvestmentTableService {
    static async create(table: InvestmentTableModel): Promise<any>{
        const tableExist = await TableRepository.findByCreatorId(table.creatorId)

        logger.info("Checking if investment table exists", { creator_id: table.creatorId });
                if (tableExist) {
                    logger.error("The user already has an investment table", { creator_id: table.creatorId });
                    throw new BadRequestError("O usuário já uma tabela de investimento");
                }
        
                return await TableRepository.create(table);
            }
}