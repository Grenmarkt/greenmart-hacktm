import { Router } from 'express';
import { shopRouter } from './api/shop/routes.ts';

const router = Router();

router.use('/shop', shopRouter);

export { router as apiRouter };
