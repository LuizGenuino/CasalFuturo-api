//tableRepository.ts

import { Model } from "sequelize";
import { NotFoundError } from "../errors/notFound.error";
import { InvestmentTableModel } from "../interfaces/investmentTable.interface";
import { InvestmentTable, UserTable, User } from "../models";
import { logger } from "../utils/logger";

export class TableRepository {


    static async create(table: InvestmentTableModel) {
        try {
            const tableCreated = await InvestmentTable.create(table)

            await (tableCreated as any).addInvited_user(table.creatorId);

            return tableCreated
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

    static async findByUserId(userId: string) {
        try {
            return await await InvestmentTable.findOne({
                include: [
                    {
                        model: User,
                        as: 'invited_users',
                        attributes: [],
                        where: { id: userId },
                    }
                ],
                attributes: { exclude: ['creatorId'] }
            });
        } catch (error) {
            logger.error("Erro ao buscar tabela de investimento por ID do usuario", error);
            throw new Error("Erro ao buscar tabela de investimento por ID do usuario: " + error.message);

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

    static async acceptInvitation(idTable: string, id: string) {
        try {
            const tableCreated = await InvestmentTable.findOne({ where: { id: idTable } })

            await (tableCreated as any).addInvited_user(id);

            return tableCreated
        } catch (err) {
            throw new Error("Erro ao aceitar convite para tabela: " + err.message);
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


