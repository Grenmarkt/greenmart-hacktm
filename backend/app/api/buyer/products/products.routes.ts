import { Router } from 'express';
import { getProduct, getProducts } from './products.handlers.ts';
import { createInputValidator } from '../../../middleware/inputValidator.ts';
import {
  filterProductsSchema,
  getProductInputSchema,
} from './products.validators.ts';

const router = Router();

router
  .route('/')
  .get(createInputValidator(filterProductsSchema, 'query'), getProducts);

router
  .route('/:productId')
  .get(createInputValidator(getProductInputSchema, 'params'), getProduct);

export { router as productsRouter };
