import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import { CategoryInstance } from "../types/category.type";


const Category = sequelize.define<CategoryInstance>("Category", {
   id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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