import { useMutation } from '@tanstack/react-query';
import { $fetch } from '@/lib/http/client';
import { BecomeSellerInput } from '@/lib/http/models/seller';
import { queryClient } from '../client';
import { useRouter } from '@tanstack/react-router';

export function useUpdateShopDescription() {
  return useMutation({
    mutationKey: ['shop', 'update', 'description'] as const,
    mutationFn: (description: string) =>
      $fetch('@patch/api/shop', { body: { description } }),
  });
}

export function useUpdateShopWorkIntervals() {
  return useMutation({
    mutationKey: ['shop', 'update', 'workIntervals'] as const,
    mutationFn: (
      workIntervals: {
        day: string;
        startTime: string;
        endTime: string;
      }[],
    ) => $fetch('@patch/api/shop', { body: { workIntervals } }),
  });
}

export function useBecomeSeller() {
  const router = useRouter();
  return useMutation({
    mutationKey: ['shop', 'create'] as const,
    mutationFn: (data: BecomeSellerInput) =>
      $fetch('@post/api/seller/becomeSeller', { body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shop'] });
      router.navigate({ to: '/seller' });
    },
  });
}
