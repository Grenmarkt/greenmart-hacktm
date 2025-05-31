import { Router } from 'express';
import { shopRouter } from './api/shop/routes.ts';
import { buyerRouter } from './api/buyer/routes.ts';
import { sellerRouter } from './api/seller/becomeSeller/products.routes.ts';

const router = Router();

router.use('/shop', shopRouter);
router.use('/buyer', buyerRouter);
router.use('/beSeller', sellerRouter);

export { router as apiRouter };
