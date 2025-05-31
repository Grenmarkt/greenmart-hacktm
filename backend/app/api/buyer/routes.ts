import { Router } from 'express';
import { productsRouter } from './products/products.routes.ts';

const router = Router();

router.use('/products', productsRouter);
//... more routes

export { router as buyerRouter };
