import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import { InvestmentTableInstance } from "../types/investmentTable.type";

const InvestmentTable = sequelize.define<InvestmentTableInstance>("InvestmentTable", {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue:
            DataTypes.UUIDV4
    },
    creatorId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "users",
            key: "id",
        },
        onDelete: "CASCADE",
    },
    initialValue: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    interval: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: "investment_tables",
    timestamps: true,
    underscored: true,
})

export default InvestmentTable;