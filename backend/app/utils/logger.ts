import { pino } from 'pino';
import { pinoHttp } from 'pino-http';
import { config } from '../config/index.ts';

export const logger = pino(config.logger);
export const httpLogger = pinoHttp({ logger });
