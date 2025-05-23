import { Model } from "sequelize";

export interface PlanModel {
    id: string;
    nome: string;          // "Free", "Pro", etc.
    preco: number;         // preço mensal ou anual
    limiteUsuarios?: number;
    createdAt?: Date; // data de criação
    updatedAt?: Date; // data de atualização
}

export interface PlanInstance extends Model<PlanModel>, PlanModel { }
