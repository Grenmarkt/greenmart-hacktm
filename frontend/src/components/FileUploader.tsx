import * as FileUpload from '@/components/ui/file-upload';
import { Button } from './ui/button';
import { Upload, X } from 'lucide-react';

type FileUploaderProps = {
  className: string;
  files: File[];
  onValueChange: React.Dispatch<React.SetStateAction<File[]>>;
  acceptedFileTypes: string;
  maxFiles: number;
  maxSize: number;
  allowMultipleFiles: boolean;
};

export default function FileUploader({
  className,
  files,
  onValueChange,
  acceptedFileTypes,
  maxFiles,
  maxSize,
  allowMultipleFiles,
}: FileUploaderProps) {
  return (
    <FileUpload.Root
      className={className}
      value={files}
      onValueChange={onValueChange}
      accept={acceptedFileTypes}
      maxFiles={maxFiles}
      maxSize={maxSize}
      multiple={allowMultipleFiles}>
      <FileUpload.Dropzone>
        <div className='flex flex-col items-center gap-1'>
          <div className='flex items-center justify-center rounded-full border p-2.5'>
            <Upload className='text-muted-foreground size-6' />
          </div>
          <p className='text-sm font-medium'>Drag & drop files here</p>
          <p className='text-muted-foreground text-xs'>
            Or click to browse (max 2 files)
          </p>
        </div>
        <FileUpload.Trigger asChild>
          <Button variant='outline' size='sm' className='mt-2 w-fit'>
            Browse files
          </Button>
        </FileUpload.Trigger>
      </FileUpload.Dropzone>
      <FileUpload.List>
        {files.map((file, index) => (
          <FileUpload.Item key={index} value={file}>
            <FileUpload.ItemPreview />
            <FileUpload.ItemMetadata />
            <FileUpload.ItemDelete asChild>
              <Button variant='ghost' size='icon' className='size-7'>
                <X />
              </Button>
            </FileUpload.ItemDelete>
          </FileUpload.Item>
        ))}
      </FileUpload.List>
    </FileUpload.Root>
  );
}
