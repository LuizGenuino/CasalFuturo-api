import { Router } from "express";
import authRouter from "./auth.route";
import tableRouter from "./table.route";

const router = Router();

router.use("/auth", authRouter);
router.use("/investment-table", tableRouter);

export default router;