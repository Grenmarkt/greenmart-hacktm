import { Router } from 'express';
import { becomeSeller } from './becomeSeller.handlers.ts';
import { authHandler, sellerHandler } from '../../../middleware/authHandlers.ts';
import { getReview, getReviews } from '../reviews/reviews.handler.ts';

const router = Router();

router.post('/beSeller',authHandler, sellerHandler, becomeSeller);

router.get('/reviews/:shopId', getReviews);
router.get('/review/:shopId',getReview);
export { router as sellerRouter };
