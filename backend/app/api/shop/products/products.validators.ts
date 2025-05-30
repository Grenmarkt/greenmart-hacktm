import { ProductTypeCategory, UnitType } from '@prisma/client';
import { z } from 'zod/v4';

export const createProductSchema = z.strictObject({
  productType: z.string(),
  title: z.string().min(3).max(50),
  description: z
    .string()
    .max(500, { message: 'Description must be under 500 characters' })
    .default(""),
  image: z.string().optional(),
  price: z.number().positive(),
  unitType: z.enum(UnitType),
  stock: z.number().positive(),
  city: z.string().default(""),
  county: z.string().default(""),
  street: z.string().default(""),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});
  
export const filterProductsSchema = z.strictObject({
  category: z.enum(ProductTypeCategory).optional(),
  orderBy: z.enum(['price', 'stock', 'createdAt']).optional(),
  orderDir: z.enum(['asc', 'desc']).optional(),
});

export type CreateProductData = z.infer<typeof createProductSchema>;
export type ProductsFilter = z.infer<typeof filterProductsSchema>;
