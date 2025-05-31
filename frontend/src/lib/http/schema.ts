import { createSchema } from '@better-fetch/fetch';
import {
  createProductInputSchema,
  getProductsInputSchema,
  productOutputSchema,
} from './models/products';
import z from 'zod/v4';

export const schema = createSchema({
  '@post/api/shop/products': { input: createProductInputSchema },
  '@get/api/buyer/products': {
    query: getProductsInputSchema,
    output: z.array(productOutputSchema),
  },
  '@get/api/buyer/products/:productId': {},
});
