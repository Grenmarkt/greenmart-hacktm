import * as FileUpload from '@/components/ui/file-upload';
import { Button } from './ui/button';
import { Upload, X } from 'lucide-react';

type FileUploaderProps = {
  className?: string;
  value: File[];
  onValueChange: React.Dispatch<React.SetStateAction<File[]>>;
  accept: string;
  maxFiles: number;
  maxSize: number;
  allowMultipleFiles: boolean;
};

export default function FileUploader({
  className,
  value,
  onValueChange,
  accept,
  maxFiles,
  maxSize,
  allowMultipleFiles,
}: FileUploaderProps) {
  return (
    <FileUpload.Root
      className={className}
      value={value}
      onValueChange={onValueChange}
      accept={accept}
      maxFiles={maxFiles}
      maxSize={maxSize}
      multiple={allowMultipleFiles}>
      <FileUpload.Dropzone>
        <div className='flex flex-col items-center gap-1'>
          <div className='flex items-center justify-center rounded-full border p-2.5'>
            <Upload className='text-muted-foreground size-6' />
          </div>
          <p className='text-sm font-medium'>Incarca imagini aici</p>
          <p className='text-muted-foreground text-xs'>
            Maxim {maxFiles} {maxFiles > 1 ? 'imagini' : 'imagine'}
          </p>
        </div>
        <FileUpload.Trigger asChild>
          <Button variant='outline' size='sm' className='mt-2 w-fit'>
            Cauta imagini
          </Button>
        </FileUpload.Trigger>
      </FileUpload.Dropzone>
      <FileUpload.List>
        {value.map((file, index) => (
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
