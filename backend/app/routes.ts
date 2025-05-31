import { Router } from 'express';
import { shopRouter } from './api/shop/routes.ts';
import { buyerRouter } from './api/buyer/routes.ts';

const router = Router();

router.use('/shop', shopRouter);
router.use('/buyer', buyerRouter);

export { router as apiRouter };
