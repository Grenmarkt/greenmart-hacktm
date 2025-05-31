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

export const productOutputSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  imageId: z.string(),
  imageUrl: z.string(),
  price: z.coerce.number(), // If this should be a number, use z.coerce.number()
  stock: z.coerce.number(), // Same here, you can coerce if needed
  unitType: z.string(),
  productType: z.object({ name: z.string() }),
  shopId: z.string(),
  city: z.string(),
  county: z.string(),
  street: z.string(),
  latitude: z.coerce.number(), // Optionally use z.coerce.number()
  longitude: z.coerce.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Product = z.infer<typeof productOutputSchema>;

// export const productOutputSchema = z.object({
//   id:z.string(),
//   title:z.string(),

// })
