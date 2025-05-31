import z from "zod";

export const getReviewSchema = z.strictObject({
    rating: z.number().min(1).max(5),
    comment: z.string().nullable(), 
    id: z.string(),
    userId: z.string(),
    createdAt: z.date()
});

export const getReviewInputSchema= z.strictObject({
    shopId: z.string(),
});

export type getReviewData = z.infer<typeof getReviewSchema>;