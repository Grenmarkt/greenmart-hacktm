import { Router } from 'express';
import { becomeSeller } from './becomeSeller.handlers.ts';
import { authHandler, sellerHandler } from '../../../middleware/authHandlers.ts';

const router = Router();

router
    .use(authHandler,sellerHandler)
    .route('/')
    .post(becomeSeller);

export { router as sellerRouter };
