// Must be first to load env
import 'dotenv/config';
// Third party imports
import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { toNodeHandler } from 'better-auth/node';
// Internal imports
import { httpLogger, logger } from './utils/logger.ts';
import { auth } from './utils/auth.ts';
import { limiter } from './utils/rateLimiter.ts';
import { config } from './config/index.ts';
import { apiRouter } from './routes.ts';
import { notFound } from './middleware/404.ts';
import { errorLogger } from './middleware/errorLogger.ts';
import {
  errorHandler,
  registerProcessErrorHandlers,
} from './middleware/errorHandlers.ts';
import { createRouteHandler } from 'uploadthing/express';
import { mediaUploadClient } from './utils/mediaUploadClient.ts';

const app = express();

// Third party middleware
app.use(cors(config.cors));
app.use(helmet());
app.use(cookieParser());
app.use(limiter);
app.use(httpLogger);

// Routes
app.use(
  '/api/uploadthing',
  createRouteHandler({
    router: mediaUploadClient,
  }),
);
app.all('/api/auth/*splat', toNodeHandler(auth));
app.use('/api', express.json(), apiRouter);
app.use(notFound);

// Error handlers
app.use(errorLogger);
app.use(errorHandler);
registerProcessErrorHandlers(logger);

const port = process.env['PORT'] ?? 3000;
app.listen(port, () => {
  logger.info(`App running on port ${port}...`);
});
