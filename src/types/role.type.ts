import { Model } from "sequelize";
import { RoleModel } from "../interfaces/role.interface";


export interface RoleInstance extends Model<RoleModel>, RoleModel { }