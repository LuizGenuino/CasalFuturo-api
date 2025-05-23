import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import { CategoryInstance } from "../types/category.type";


const Category = sequelize.define<CategoryInstance>("Category", {
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
    cor_hex: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isHexColor: true,
        },
    },
}, {
    tableName: "categories",
    timestamps: true,
    underscored: true,
})

export default Category;