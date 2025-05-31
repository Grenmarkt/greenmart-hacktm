import { Router } from 'express';
import { productsRouter } from './products/products.routes.ts';
import { orderRouter } from './order/order.routes.ts';

const router = Router();

router.use('/products', productsRouter);
router.use('/orders', orderRouter);
export { router as buyerRouter };
