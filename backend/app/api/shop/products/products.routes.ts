import { Router } from 'express';
import { createProduct, getProducts } from './products.handlers.ts';


const router = Router();

router
  .route('/')
  .get(getProducts)
  .post(createProduct);

export { router as productsRouter };
