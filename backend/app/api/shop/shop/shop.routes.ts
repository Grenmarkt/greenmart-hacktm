import { Router } from 'express';
import { getShop } from './shop.handlers.ts';


const router = Router();

router.get('/:sellerId',getShop);

export { router as shop1Router };
