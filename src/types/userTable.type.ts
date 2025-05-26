import { Model } from "sequelize";
import { UserTableModel } from "../interfaces/userTable.interface";



export interface UserTableInstance extends Model<UserTableModel>, UserTableModel { }