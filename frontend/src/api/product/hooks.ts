import { useMutation } from '@tanstack/react-query';
import { $fetch } from '@/lib/http/client';

type CreateProductData = {
  imageUrl: string | undefined;
  imageId: string | undefined;
  title: string;
  productType: string;
  price: number;
  unitType: string;
  stock: number;
  description?: string | undefined;
};

export function useCreateProduct() {
  return useMutation({
    mutationKey: ['product', 'create'] as const,
    mutationFn: (createProductData: CreateProductData) =>
      $fetch('@post/api/products', { body: createProductData }),
  });
}
