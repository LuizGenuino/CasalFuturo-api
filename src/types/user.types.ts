import { Model } from "sequelize";

export interface UserModel {
    id: string;
    name: string;
    email: string;
    password: string;
    lastLogin?: Date;
    isVerified: boolean;
    resetPasswordToken?: string;
    resetPasswordExpiresAt?: Date;
    verificationCode?: string;
    verificationCodeExpiresAt?: Date;
    cor_hex: string;
    createdAt?: Date; // data de criação
    updatedAt?: Date; // data de atualização
}

export interface UserInstance extends Model<UserModel>, UserModel { }