import { Model } from "sequelize";

export interface RoleModel {
    id: string;
    name: string; // nome do papel
    createdAt?: Date; // data de criação
    updatedAt?: Date; // data de atualização
}
export interface RoleInstance extends Model<RoleModel>, RoleModel { }