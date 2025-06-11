import { z } from 'zod/v4';

export const createProductInputSchema = z.object({
  productType: z.string(),
  title: z.string(),
  description: z.string().optional(),
  price: z.number(),
  unitType: z.string(),
  stock: z.number(),
  imageUrl: z.string().optional(),
  imageId: z.string().optional(),
});

export const getProductsInputSchema = z.object({
  productType: z.string().optional(),
  city: z.string().optional(),
  category: z.string().optional(),
});

export type GetProductsInput = z.infer<typeof getProductsInputSchema>;
export type Product = z.infer<typeof productOutputSchema>;

export const productOutputSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  imageId: z.string().nullish(), // Use .nullish() if the field can be null or undefined
  imageUrl: z.string().nullish(), // Same here, use .nullish() for optional fields
  price: z.coerce.number(), // If this should be a number, use z.coerce.number()
  stock: z.coerce.number(), // Same here, you can coerce if needed
  unitType: z.string(),
  productType: z.object({ name: z.string(), category: z.string() }),
  shop: z
    .object({
      name: z.string(),
      description: z.string().optional(),
    })
    .optional(),
  shopId: z.string(),
  city: z.string(),
  county: z.string(),
  street: z.string(),
  latitude: z.coerce.number(), // Optionally use z.coerce.number()
  longitude: z.coerce.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
