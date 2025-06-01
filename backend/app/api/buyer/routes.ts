import { Router } from 'express';
import { productsRouter } from './products/products.routes.ts';
import { orderRouter } from './order/order.routes.ts';
import { reviewsRouter } from './reviews/reviews.routes.ts';

const router = Router();

router.use('/products', productsRouter);
router.use('/orders', orderRouter);
router.use('/review', reviewsRouter);
export { router as buyerRouter };
