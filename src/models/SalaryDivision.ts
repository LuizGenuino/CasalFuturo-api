import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import { SalaryDivisionInstance } from "../types/salaryDivision.type";

const SalaryDivision = sequelize.define<SalaryDivisionInstance>("SalaryDivision", {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
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
    categoryId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "salary_categories",
            key: "id",
        },
        onDelete: "CASCADE",
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM("valor", "porcentagem"),
        allowNull: false,
    },
    value: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cor_hex: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isHexColor: true,
        },
    },
}, {
    tableName: "salary_divisions",
    timestamps: true,
    underscored: true,
})

export default SalaryDivision;
