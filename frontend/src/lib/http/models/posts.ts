import { z } from 'zod/v4';

export const postInputSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
});

export const postOutputSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
});

export type PostInput = z.infer<typeof postInputSchema>;
