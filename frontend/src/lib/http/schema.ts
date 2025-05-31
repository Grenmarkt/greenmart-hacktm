import { createSchema } from '@better-fetch/fetch';
import { createProductInputSchema } from './models/products';

export const schema = createSchema({
  '@post/api/shop/products': { input: createProductInputSchema },
  '@get/api/buyer/products/:productId': {},
});
