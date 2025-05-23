import Category from "./Category";
import InvestmentTable from "./InvestmentTable"
import MarkedTable from "./MarkedTable";
import Plan from "./Plan";
import Role from "./Role";
import SalaryDivision from "./SalaryDivision";
import User from "./User"
import UserRole from "./UserRole";
import UserTable from "./UserTable";

export const setupAssociations = () => {
    User.hasOne(InvestmentTable, {
        foreignKey: "creatorId",
        onDelete: "CASCADE",
        as: "created_investment_table"
    });

    User.belongsTo(Plan, {
        foreignKey: "planId",
        onDelete: "SET NULL",
        as: "plan"
    });

    User.hasMany(MarkedTable, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        as: "marked_numbers"
    });

    User.hasMany(SalaryDivision, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        as: "salary_divisions"
    });

    User.belongsToMany(Role, {
        through: UserRole,
        foreignKey: "userId",
        onDelete: "CASCADE",
        as: "roles"
    });

    User.belongsToMany(InvestmentTable, {
        through: UserTable,
        foreignKey: "userId",
        onDelete: "CASCADE",
        as: "shared_investment_tables"
    });

    InvestmentTable.belongsTo(User, {
        foreignKey: "creatorId",
        onDelete: "CASCADE",
        as: "creator"
    });

    InvestmentTable.hasMany(MarkedTable, {
        foreignKey: "investmentTableId",
        onDelete: "CASCADE",
        as: "marked_entries"
    });

    MarkedTable.belongsTo(InvestmentTable, {
        foreignKey: "investmentTableId",
        onDelete: "CASCADE",
        as: "investment_table"
    });

    MarkedTable.belongsTo(User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        as: "marked_by_user"
    });

    Category.hasMany(SalaryDivision, {
        foreignKey: "categoryId",
        onDelete: "SET NULL",
        as: "salary_divisions"
    });

    SalaryDivision.belongsTo(User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        as: "user"
    });

    SalaryDivision.belongsTo(Category, {
        foreignKey: "categoryId",
        onDelete: "SET NULL",
        as: "category"
    });

    Role.belongsToMany(User, {
        through: UserRole,
        foreignKey: "roleId",
        onDelete: "CASCADE",
        as: "assigned_users"
    });

    Plan.hasMany(User, {
        foreignKey: "planId",
        onDelete: "SET NULL",
        as: "subscribed_users"
    });

    InvestmentTable.belongsToMany(User, {
        through: UserTable,
        foreignKey: "investmentTableId",
        onDelete: "CASCADE",
        as: "invited_users"
    });
}