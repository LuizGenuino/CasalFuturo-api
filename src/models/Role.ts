import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import { RoleInstance } from "../types/role.type";

const Role = sequelize.define<RoleInstance>("Role", {
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
}, {
    tableName: "roles",
    timestamps: true,
    underscored: true,
})

export default Role;