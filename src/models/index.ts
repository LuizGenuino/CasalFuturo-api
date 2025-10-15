import { setupAssociations } from "./Associations";
import Category from "./Category";
import InvestmentTable from "./InvestmentTable";
import MarkedTable from "./MarkedTable";
import Plan from "./Plan";
import Role from "./Role";
import SalaryDivision from "./SalaryDivision";
import User from "./User";
import UserRole from "./UserRole";
import UserTable from "./UserTable";

setupAssociations()

export {
    Category,
    InvestmentTable,
    MarkedTable,
    Plan,
    Role,
    SalaryDivision,
    User,
    UserRole,
    UserTable
}