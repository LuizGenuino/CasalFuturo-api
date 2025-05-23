import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import { UserRoleInstance } from "../types/userRole.type";

const UserRole = sequelize.define<UserRoleInstance>("UserRole", {
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
    roleId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "roles",
            key: "id",
        },
        onDelete: "CASCADE",
    },
}, {
    tableName: "user_roles",
    timestamps: true,
    underscored: true,
})

export default UserRole;