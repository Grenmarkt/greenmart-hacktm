import { createUploadthing, type FileRouter } from 'uploadthing/express';
import { logger } from './logger.ts';

const mediaUploader = createUploadthing();

export const mediaUploadClient = {
  productImage: mediaUploader(['image']).onUploadComplete((data) =>
    logger.info('file', data),
  ),
} satisfies FileRouter;

export type MediaUploadClient = typeof mediaUploadClient;
