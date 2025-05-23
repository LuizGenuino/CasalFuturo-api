import { Model } from "sequelize";

export interface SalaryDivisionModel {
    id: string;
    userId: string; // ID do usuário
    categoryId: string; // ID da categoria
    name: string; // nome da divisão salarial
    type: string; // tipo da divisão salarial (ex: "receita", "despesa")
    value: number; // valor da divisão salarial
    cor_hex: string;
    createdAt?: Date; // data de criação
    updatedAt?: Date; // data de atualização
}
export interface SalaryDivisionInstance extends Model<SalaryDivisionModel>, SalaryDivisionModel { }