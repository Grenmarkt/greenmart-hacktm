import { Router } from 'express';
import { shopRouter } from './api/shop/routes.ts';
import { buyerRouter } from './api/buyer/routes.ts';
import { sellerRouter } from './api/seller/becomeSeller/products.routes.ts';
import { shop1Router } from './api/shop/shop/shop.routes.ts';

const router = Router();

router.use('/shop', shopRouter);
router.use('/buyer', buyerRouter);
router.use('/seller', sellerRouter);
router.use('/shop',shop1Router);

export { router as apiRouter };
