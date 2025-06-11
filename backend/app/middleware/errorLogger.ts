import { type NextFunction, type Request, type Response } from 'express';
import { logger } from '../utils/logger.ts';

export const errorLogger = (
  error: unknown,
  _req: Request,
  _res: Response,
  next: NextFunction,
) => {
  logger.error({ err: error });
  next(error);
};
