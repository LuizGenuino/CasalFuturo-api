import { Router } from "express";
import authRouter from "./auth.route";

const router = Router();

router.use("/auth", authRouter);

export default router;