import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import { MarkedTableInstance } from "../types/markedTable.type";

const MakerdTable = sequelize.define<MarkedTableInstance>("MarkedTable", {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue:
            DataTypes.UUIDV4
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "users",
            key: "id",
        },
        onDelete: "CASCADE",
    },
    investmentTableId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "investment_tables",
            key: "id",
        },
        onDelete: "CASCADE",
    },
    markedNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: "marked_tables",
    timestamps: true,
    underscored: true,
})

export default MakerdTable;