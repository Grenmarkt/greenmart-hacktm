import { type ZodObject } from 'zod/v4';
import type { RequestHandler, Request, Response, NextFunction } from 'express';

type RequestInputChannel = 'body' | 'query' | 'params';

export const createInputValidator =
  <Schema extends ZodObject>(
    schema: Schema,
    requestInputChannel: RequestInputChannel,
  ): RequestHandler =>
  (req: Request, _res: Response, next: NextFunction) => {
    const parsedInput = schema.parse(req[requestInputChannel] ?? {});
    req[requestInputChannel] = parsedInput;
    next();
  };
