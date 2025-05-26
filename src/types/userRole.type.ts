import { Model } from "sequelize";
import { UserRoleModel } from "../interfaces/userRole.interface";


export interface UserRoleInstance extends Model<UserRoleModel>, UserRoleModel { }