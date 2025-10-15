import { z } from "zod";

export const tableSchema = z.object({
    initialValue: z.number().min(1, { message: "Initial value must be at least 1" }),
    interval: z.number().min(0, { message: "Interval must be at least 0" }),
    amount: z.number().min(10, { message: "Amount must be at least 10" }),
});