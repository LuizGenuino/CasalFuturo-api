import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { InvestmentTableService } from "../services/table.service";
import { InvestmentTableModel } from "../interfaces/investmentTable.interface";
import { logger } from "../utils/logger";
import { sendInviteEmail } from "../providers/email/mailtrap.provider";

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

    static inviteUser = asyncHandler(async (req: Request, res: Response) => {
        const { email } = req.body;
        const userId = req.userId;
        const userName = req.name

        const investmentTable: InvestmentTableModel = await InvestmentTableService.getCurrentUserTable(userId)

        logger.info("Started inviting user", { email })
        const user = await InvestmentTableService.inviteUser(email, investmentTable.id)

        logger.info("Sending password reset email");
        await sendInviteEmail(email, user.resetPasswordToken, userName);

        res.status(200).json({ success: true, message: "invitation email sent successfully" })
    })

    static acceptInvitation = asyncHandler(async (req: Request, res: Response) => {
        const { tableInvitationToken } = req.body;
        const investmentTable = await InvestmentTableService.acceptInvitation(tableInvitationToken)

        logger.info("Going to save the user after email verification")

        res.status(200).json({ success: true, message: "invitation accepted successfully", data: investmentTable })
    })
}