import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { InvestmentTableService } from "../services/table.service";
import { InvestmentTableModel } from "../interfaces/investmentTable.interface";
import { logger } from "../utils/logger";

export class TableController {
    static create = asyncHandler(async (req: Request, res: Response) => {
        const data = req.body;
        const userId = req.userId;

        const investmentTable = await InvestmentTableService.create(data, userId);
        logger.info('Investment table created successfully', { userId: userId, tableId: investmentTable.id });

        res.status(200).json({ success: true, message: "Investment table created successfully", data: investmentTable })
    })

    static currentUserTable = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.userId;

        const investmentTable = await InvestmentTableService.getCurrentUserTable(userId);
        logger.info("current user's investment table found successfully", { userId: userId });

        res.status(200).json({ success: true, message: "current user's investment table found successfully", data: investmentTable })
    })
}