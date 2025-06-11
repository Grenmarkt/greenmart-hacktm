import { z } from 'zod/v4';

export const becomeSellerSchema = z.strictObject({
  name: z.string().min(3).max(50),
  description: z.string().optional(),
  banner: z.string().optional(),
  city: z.string(),
  county: z.string(),
  street: z.string(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  phone: z.string(),
  workIntervals: z.array(
    z.object({
      day: z.string(),
      startTime: z.string(),
      endTime: z.string(),
    }),
  ),
});

export type becomeSellerData = z.infer<typeof becomeSellerSchema>;
