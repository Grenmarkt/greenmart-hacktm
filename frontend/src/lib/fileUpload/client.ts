import { genUploader } from 'uploadthing/client';

import { type MediaUploadClient } from '../../../../backend/app/utils/mediaUploadClient';

export const { uploadFiles } = genUploader<MediaUploadClient>({
  url: `${import.meta.env['VITE_API_URL']}/api/uploadthing`,
});
