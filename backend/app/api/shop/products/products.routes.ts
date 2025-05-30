import { Router } from 'express';
import { createProduct, getProducts } from './products.handlers.ts';
import { createProductSchema } from './products.validators.ts';
import { createInputValidator } from '../../../middleware/inputValidator.ts';

const router = Router();

router
  .route('/')
  .get(getProducts)
  .post(createInputValidator(createProductSchema, 'body'), createProduct);

export { router as productsRouter };
