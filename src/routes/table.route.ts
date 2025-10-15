import { Router } from "express";
import { validateSchema } from "../middlewares/validation.middleware";
import { verifyToken } from "../middlewares/auth.middleware";
import { tableSchema } from "../schemas/table.schema";
import { TableController } from "../controllers/table.controller";

const tableRouter = Router()

tableRouter.post("/", verifyToken, validateSchema(tableSchema, "body"), TableController.create)
tableRouter.get("/", verifyToken, TableController.currentUserTable)

export default tableRouter;