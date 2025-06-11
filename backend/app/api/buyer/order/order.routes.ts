import { Router } from 'express';
import { authHandler } from '../../../middleware/authHandlers.ts';
import { createOrder } from './createOrder.handlers.ts';
import { deleteOrder } from './deleteOrder.handler.ts';
import { getOrderProducts } from './getOrder.handler.ts';
import { checkoutOrder } from './checkoutOrder.handlers.ts';

const router = Router();

router.post('/',authHandler,createOrder);
router.post('/checkout',authHandler, checkoutOrder);
router.delete('/:orderId',authHandler,deleteOrder);
router.get('/',authHandler,getOrderProducts);

export { router as orderRouter };
