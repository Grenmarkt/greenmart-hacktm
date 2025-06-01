import { Router } from 'express';
import { productsRouter } from './products/products.routes.ts';
import { shopHandler } from '../../middleware/authHandlers.ts';
import { shop1Router } from './shop/shop.routes.ts';

const router = Router();

router.use('/products', shopHandler,productsRouter);
router.use('/seller',shop1Router);
//... more routes

export { router as shopRouter };
