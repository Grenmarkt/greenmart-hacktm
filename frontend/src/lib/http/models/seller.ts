import z from 'zod';

export const sellerInfoOutputSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  city: z.string(),
  county: z.string(),
  street: z.string(),
  latitude: z.string(),
  longitude: z.string(),
  workIntervals: z
    .array(
      z.object({
        day: z.string(),
        startTime: z.string(),
        endTime: z.string(),
      }),
    )
    .optional(),
  review: z
    .array(
      z.object({
        rating: z.number(),
      }),
    )
    .optional(),
  phone: z.string(),
  Product: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      imageId: z.string().nullable(),
      imageUrl: z.string().nullable(),
      price: z.coerce.number(), // If this should be a number, use z.coerce.number()
      stock: z.coerce.number(), // Same here, you can coerce if needed
      unitType: z.string(),
      productType: z
        .object({ name: z.string(), category: z.string() })
        .optional(),
      shopId: z.string(),
      city: z.string(),
      county: z.string(),
      street: z.string(),
      latitude: z.coerce.number(), // Optionally use z.coerce.number()
      longitude: z.coerce.number(),
      createdAt: z.string(),
      updatedAt: z.string(),
    }),
  ),
});

export const becomeSellerInputSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  phone: z.string(),
  city: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  county: z.string(),
  street: z.string(),
  workIntervals: z.array(
    z.object({
      day: z.string(),
      startTime: z.string(),
      endTime: z.string(),
    }),
  ),
});

export type BecomeSellerInput = z.infer<typeof becomeSellerInputSchema>;
