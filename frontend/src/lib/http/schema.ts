import { z } from 'zod/v4';
import { createSchema } from '@better-fetch/fetch';
import { postInputSchema, postOutputSchema } from './models/posts';

export const schema = createSchema({
  '@get/api/posts': { output: z.array(postOutputSchema) },
  '@get/api/posts/:id': { output: postOutputSchema },
  '@post/api/posts': { input: postInputSchema, output: postOutputSchema },
});
