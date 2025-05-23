import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import { UserTableInstance } from "../types/userTable.type";

const UserTable = sequelize.define<UserTableInstance>("UserTable", {
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
        unique: true,
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
}, {
    tableName: "user_tables",
    timestamps: true,
    underscored: true,
})

export default UserTable;
