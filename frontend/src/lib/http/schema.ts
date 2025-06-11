import { createSchema } from '@better-fetch/fetch';
import {
  createProductInputSchema,
  getProductsInputSchema,
  productOutputSchema,
} from './models/products';
import z from 'zod/v4';
import {
  becomeSellerInputSchema,
  sellerInfoOutputSchema,
} from './models/seller';

export const schema = createSchema({
  '@post/api/shop/products': { input: createProductInputSchema },
  '@get/api/buyer/products': {
    query: getProductsInputSchema,
    output: z.array(productOutputSchema),
  },
  '@get/api/buyer/products/:productId': { output: productOutputSchema },
  '@get/api/shop/seller/:sellerId': { output: sellerInfoOutputSchema },
  '@patch/api/shop': {},
  '@post/api/seller/becomeSeller': { input: becomeSellerInputSchema },
});
