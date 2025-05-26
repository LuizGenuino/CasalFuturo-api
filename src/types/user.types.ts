import { Model } from "sequelize";
import { UserModel } from "../interfaces/user.interface";



export interface UserInstance extends Model<UserModel>, UserModel { }