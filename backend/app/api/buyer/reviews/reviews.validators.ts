import {z} from 'zod/v4';

export const createReviewSchema = z.strictObject({
    rating: z.number().min(1).max(5),
    comment: z.string().optional(),
});

