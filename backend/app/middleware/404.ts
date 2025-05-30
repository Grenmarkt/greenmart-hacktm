import { type Request } from 'express';
import { AppError } from '../utils/appError.ts';

export const notFound = (req: Request) => {
  throw AppError.notFound(`Route ${req.method} ${req.originalUrl} not found`);
};
