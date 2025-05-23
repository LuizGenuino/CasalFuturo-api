import { Model } from "sequelize";

export interface UserRoleModel {
    id: string;
    userId: string; // ID do usuário
    roleId: string; // ID do papel
    createdAt?: Date; // data de criação
    updatedAt?: Date; // data de atualização
}
export interface UserRoleInstance extends Model<UserRoleModel>, UserRoleModel { }