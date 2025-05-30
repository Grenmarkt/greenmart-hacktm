import { type NextFunction, type Request, type Response } from 'express';
import { AppError } from '../utils/appError.ts';
import { ZodError } from 'zod';
import type { Logger } from 'pino';
import { APIError } from 'better-auth/api';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let computedError = error;

  if (computedError instanceof ZodError) {
    computedError = AppError.badRequest(computedError.message);
  } else if (computedError instanceof APIError) {
    computedError = AppError.unauthorized(
      'Access denied. Please sign in to continue.',
    );
  } else if (computedError instanceof PrismaClientKnownRequestError) {
    // TODO
    computedError = {};
  }

  if (computedError instanceof AppError) {
    res.status(computedError.statusCode).json({
      status: computedError.status,
      message: computedError.message,
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};

export const registerProcessErrorHandlers = (logger: Logger) => {
  process.on('uncaughtException', (error: unknown) => {
    logger.fatal({ err: error }, 'Uncaught Exception — shutting down');
    process.exit(1);
  });

  process.on('unhandledRejection', (reason: unknown) => {
    logger.fatal({ err: reason }, 'Unhandled Rejection — shutting down');
    process.exit(1);
  });
};
