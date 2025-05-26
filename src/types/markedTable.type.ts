import { Model } from "sequelize";
import { MarkedTableModel } from "../interfaces/markedTable.interface";


export interface MarkedTableInstance extends Model<MarkedTableModel>, MarkedTableModel { }