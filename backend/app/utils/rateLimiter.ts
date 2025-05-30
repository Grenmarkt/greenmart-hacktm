import rateLimiter from 'express-rate-limit';
import { config } from '../config/index.ts';

export const limiter = rateLimiter(config.rateLimiter);
