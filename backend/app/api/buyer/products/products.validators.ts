import { ProductTypeCategory } from '@prisma/client';
import { z } from 'zod/v4';

export const filterProductsSchema = z.strictObject({
  name: z.string().min(3).max(50).optional(),
  category: z.enum(ProductTypeCategory).optional(),
  orderBy: z.enum(['price', 'stock', 'createdAt']).optional(),
  orderDir: z.enum(['asc', 'desc']).optional(),
});

export type ProductsFilter = z.infer<typeof filterProductsSchema>;

export const getProductInputSchema = z.strictObject({
  productId: z.string(),
});

export type GetProductData = z.infer<typeof getProductInputSchema>;
