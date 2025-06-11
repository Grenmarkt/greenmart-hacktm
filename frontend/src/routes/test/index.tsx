import { createFileRoute } from '@tanstack/react-router';
import type { MediaUploadClient } from '../../../../backend/app/utils/mediaUploadClient';
import { generateUploadButton } from '@uploadthing/react';

export const Route = createFileRoute('/test/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className='bg-black'>
      <UploadButton
        endpoint='productImage'
        content={{
          // `button` replaces the inner label content
          button: 'Aici',
        }}
        onClientUploadComplete={(res) => {
          console.log('Uploaded!', res);
        }}
        onUploadError={(err) => {
          console.error(err);
        }}
      />
    </div>
  );
}

const UploadButton = generateUploadButton<MediaUploadClient>({
  url: 'http://0.0.0.0:3000/api/uploadthing',
});
