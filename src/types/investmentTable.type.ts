import { Model } from "sequelize";
import { InvestmentTableModel } from "../interfaces/investmentTable.interface";



export interface InvestmentTableInstance extends Model<InvestmentTableModel>, InvestmentTableModel { }