import { z } from "zod";

export const scheduleSchema = z.object({
    scheduleDate: z.string(),
    scheduleHour: z.string(),
    booth: z.number().min(1),
    observation: z.string().optional(),
});