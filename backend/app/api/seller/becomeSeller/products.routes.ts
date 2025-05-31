import { Router } from 'express';
import { becomeSeller } from './becomeSeller.handlers.ts';
import { authHandler } from '../../../middleware/authHandlers.ts';

const router = Router();

router
    .use(authHandler)
    .route('/')
    .post(becomeSeller);

export { router as sellerRouter };
