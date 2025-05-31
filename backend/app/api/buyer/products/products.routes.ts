import { Router } from 'express';
import { getProduct } from './products.handlers.ts';
import { createInputValidator } from '../../../middleware/inputValidator.ts';
import { getProductInputSchema } from './products.validators.ts';

const router = Router();

router
  .route('/')
  .get(createInputValidator(getProductInputSchema, 'params'), getProduct);

export { router as productsRouter };
