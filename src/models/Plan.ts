import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import { PlanInstance } from "../types/plan.type";

const Plan = sequelize.define<PlanInstance>("Plan", {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue:
            DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: "plans",
    timestamps: true,
    underscored: true,
})

export default Plan;