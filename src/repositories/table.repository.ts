//tableRepository.ts

import { NotFoundError } from "../errors/notFound.error";
import { InvestmentTableModel } from "../interfaces/investmentTable.interface";
import InvestmentTable from "../models/InvestmentTable";
import { logger } from "../utils/logger";

export class TableRepository {


    static async create(table: InvestmentTableModel) {
        try {
            return await InvestmentTable.create(table)
        } catch (error) {
            logger.error("Erro ao criar tabela de investimento", error);
            throw new Error("Erro ao criar tabela de investimento: " + error.message);
        }
    }

    static async findAll() {
        try {
            return await InvestmentTable.findAll();
        } catch (error) {
            logger.error("Erro ao buscar tabela de investimento", error);
            throw new Error("Erro ao buscar tabela de investimento: " + error.message);
        }

    };


    static async findById(id: string) {
        try {
            return await InvestmentTable.findOne({ where: { id: id } })
        } catch (error) {
            logger.error("Erro ao buscar tabela de investimento por ID", error);
            throw new Error("Erro ao buscar tabela de investimento por ID: " + error.message);

        }
    }

    static async findByCreatorId(creatorId: string) {
        try {
            return await InvestmentTable.findOne({ where: { creatorId: creatorId } })
        } catch (error) {
            logger.error("Erro ao buscar tabela de investimento por ID do criador", error);
            throw new Error("Erro ao buscar tabela de investimento por ID do criador: " + error.message);

        }
    }

    static async update(id: string, tableaData: Partial<InvestmentTableModel>) {
        try {
            const user = await InvestmentTable.findByPk(id);
            if (!user) {
                logger.error("Tabela de investimento não encontrada");
                throw new NotFoundError("Tabela de investimento não encontrada");
            };
            return await user.update(tableaData);
        } catch (err) {
            throw new Error("Erro ao atualizar tabela de investimento: " + err.message);
        }
    };


    static async remove(id) {
        try {
            const user = await InvestmentTable.findByPk(id);
            if (!user) {
                logger.error("Tabela de investimento não encontrada");
                throw new NotFoundError("Tabela de investimento não encontrad");
            };
            await user.destroy();
            return true;
        } catch (error) {
            logger.error("Erro ao remover tabela de investimento", error);
            throw new Error("Erro ao remover tabela de investimento: " + error.message);
        }
    };
}


