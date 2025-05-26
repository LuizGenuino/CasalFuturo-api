import { Model } from "sequelize";
import { PlanModel } from "../interfaces/plan.interface";


export interface PlanInstance extends Model<PlanModel>, PlanModel { }
