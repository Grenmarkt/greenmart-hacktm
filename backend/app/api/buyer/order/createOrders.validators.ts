import {z} from 'zod/v4';

export const placeOrderSchema = z.strictObject({
    productId: z.string(),
    quantity: z.number().min(1, { message: "Quantity must be at least 1" }),
    createdAt: z.date().optional(),
});

export type placeOrder = z.infer<typeof placeOrderSchema>;
