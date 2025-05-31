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

// export const productOutputSchema = z.object({
//   id:z.string(),
//   title:z.string(),

// })
