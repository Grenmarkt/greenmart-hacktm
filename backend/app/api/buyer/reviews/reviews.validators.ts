import { z } from "zod";

export const createReview = z.object
({
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
});

export type CreateReviewData = z.infer<typeof createReview>;