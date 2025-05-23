import { Model } from "sequelize";

export interface CategoryModel {
    id: string;
    name: string; // nome da categoria
    cor_hex: string;
    createdAt?: Date; // data de criação
    updatedAt?: Date; // data de atualização
}

export interface CategoryInstance extends Model<CategoryModel>, CategoryModel { }   