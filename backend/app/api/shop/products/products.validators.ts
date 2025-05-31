import { ProductTypeCategory, UnitType } from '@prisma/client';
import { z } from 'zod/v4';

export const createProductSchema = z.strictObject({
  productType: z.string(),
  title: z.string().min(3).max(50),
  description: z
    .string()
    .max(500, { message: 'Description must be under 500 characters' })
    .default(''),
  imageUrl: z.string().optional(),
  imageId: z.string().optional(),
  price: z.number().positive(),
  unitType: z.enum(UnitType),
  stock: z.number().positive(),
  city: z.string().optional(),
  county: z.string().optional(),
  street: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export const filterProductsSchema = z.strictObject({
  category: z.enum(ProductTypeCategory).optional(),
  orderBy: z.enum(['price', 'stock', 'createdAt']).optional(),
  orderDir: z.enum(['asc', 'desc']).optional(),
});

export type CreateProductData = z.infer<typeof createProductSchema>;
export type ProductsFilter = z.infer<typeof filterProductsSchema>;
