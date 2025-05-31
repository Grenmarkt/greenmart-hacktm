import { z } from 'zod/v4';

export const getProductInputSchema = z.strictObject({
  productId: z.string(),
});

export type GetProductData = z.infer<typeof getProductInputSchema>;
