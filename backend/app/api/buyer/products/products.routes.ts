import { Router } from 'express';
import { getProducts } from './products.handlers.ts';


const router = Router();

router
  .route('/')
  .get(getProducts);

export { router as productsRouter };
