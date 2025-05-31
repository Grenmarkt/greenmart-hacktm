import { Router } from 'express';
import { authHandler } from '../../../middleware/authHandlers.ts';
import { createOrder } from './createOrder.handlers.ts';

const router = Router();

router.post('/',authHandler,createOrder);

export { router as orderRouter };
