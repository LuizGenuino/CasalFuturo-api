import { Model } from "sequelize";
import { CategoryModel } from "../interfaces/category.interface";


export interface CategoryInstance extends Model<CategoryModel>, CategoryModel { }   