import { $fetch } from '@/lib/http/client';
import { useMutation } from '@tanstack/react-query';

type CreateOrderProductData = {
  userId: string;
  productId: string;
  quantity: number;
};

export function useCreateOrderProduct() {
  return useMutation({
    mutationKey: ['products', 'create', 'order'] as const,
    mutationFn: (CreateOrderProductData: CreateOrderProductData) =>
      $fetch('@post/api/buyer/orders', { body: CreateOrderProductData }),
  });
}
