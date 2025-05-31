import { Router } from 'express';
import { authHandler } from '../../../middleware/authHandlers.ts';
import { createOrder } from './createOrder.handlers.ts';
import { deleteOrder } from './deleteOrder.handler.ts';

const router = Router();

router.post('/',authHandler,createOrder);
router.delete('/:orderId',authHandler,deleteOrder);

export { router as orderRouter };
