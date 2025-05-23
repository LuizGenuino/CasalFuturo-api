import { Model } from "sequelize";

export interface PlanModel {
    id: string;
    name: string;          // "Free", "Pro", etc.
    price: number;         // preço mensal ou anual
    description?: string; // descrição do plano
    createdAt?: Date; // data de criação
    updatedAt?: Date; // data de atualização
}

export interface PlanInstance extends Model<PlanModel>, PlanModel { }
