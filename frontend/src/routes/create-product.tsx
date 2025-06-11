import {
  ProductUploadForm,
  ProductUploadFormInput,
} from '@/components/ProductUploadForm';
import { createFileRoute } from '@tanstack/react-router';
import { uploadFiles } from '@/lib/fileUpload/client';
import { toast } from 'sonner';
import { useCreateProduct } from '@/api/products/hooks';
export const Route = createFileRoute('/create-product')({
  component: RouteComponent,
});

function RouteComponent() {
  const mutation = useCreateProduct();
  const onFormSubmit = async (data: ProductUploadFormInput) => {
    try {
      const [uploadedFile] = await uploadFiles('productImage', {
        files: data.image,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { image, ...rest } = data;
      const productData = {
        ...rest,
        imageUrl: uploadedFile?.ufsUrl,
        imageId: uploadedFile?.key,
      };
      mutation.mutate(productData);
    } catch (_err) {
      toast.error('Ceva nu a mers', {
        description: 'Produsul nu a putut fi adaugat',
      });
    }
  };
  return (
    <div className='mx-auto flex w-11/12 items-center justify-center p-8'>
      <ProductUploadForm onSubmit={onFormSubmit}></ProductUploadForm>
    </div>
  );
}
