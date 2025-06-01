/* eslint-disable @typescript-eslint/no-explicit-any */
import { useBecomeSeller } from '@/api/shop/hooks';
import {
  BecomeSellerForm,
  BecomeSellerFormInput,
} from '@/components/BecomeSellerForm';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/become-seller')({
  component: RouteComponent,
});

function RouteComponent() {
  const mutation = useBecomeSeller();
  const onFormSubmit = (data: BecomeSellerFormInput) => {
    const DAYS = [
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday',
    ];

    const { name, description, phone, ...times } = data;

    const workIntervals = DAYS.map((day) => ({
      day,
      startTime: (times as any)[`${day}StartTime`],
      endTime: (times as any)[`${day}EndTime`],
    }));

    mutation.mutate({ name, description, phone, workIntervals });
  };
  return (
    <div className='mx-auto flex w-11/12 items-center justify-center p-8'>
      <BecomeSellerForm onSubmit={onFormSubmit} />
    </div>
  );
}
