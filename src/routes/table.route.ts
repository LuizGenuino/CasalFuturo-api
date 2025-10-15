import { Router } from "express";
import { validateSchema } from "../middlewares/validation.middleware";
import { verifyToken } from "../middlewares/auth.middleware";
import { acceptInvitationSchema, invateUserSchema, tableSchema } from "../schemas/table.schema";
import { TableController } from "../controllers/table.controller";

const tableRouter = Router()

tableRouter.post("/", verifyToken, validateSchema(tableSchema, "body"), TableController.create)
tableRouter.get("/", verifyToken, TableController.currentUserTable)
tableRouter.post("/invite-user", verifyToken, validateSchema(invateUserSchema, "body"), TableController.inviteUser)
tableRouter.post("/accept-invitation", verifyToken, validateSchema(acceptInvitationSchema, "body"), TableController.acceptInvitation)

export default tableRouter;