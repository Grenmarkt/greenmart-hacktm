import { Router } from 'express';
import { productsRouter } from './products/products.routes.ts';
import { authHandler, shopHandler } from '../../middleware/authHandlers.ts';

const router = Router();

router.use(authHandler, shopHandler);
router.use('/products', productsRouter);
//... more routes

export { router as shopRouter };
