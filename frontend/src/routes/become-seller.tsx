/* eslint-disable @typescript-eslint/no-explicit-any */
import { useBecomeSeller } from '@/api/shop/hooks';
import { AddressAutocomplete } from '@/components/AddressAutocomplete';
import {
  BecomeSellerForm,
  BecomeSellerFormInput,
} from '@/components/BecomeSellerForm';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/become-seller')({
  component: RouteComponent,
});

function RouteComponent() {
  const [locationData, setLocationData] = useState<{
    latitude: number;
    longitude: number;
    city: string | null;
    placeName: string;
  } | null>(null);
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

    console.log(locationData);

    mutation.mutate({ name, description, phone, workIntervals });
  };
  return (
    <div className='mx-auto flex w-11/12 items-center justify-center p-8'>
      <BecomeSellerForm onSubmit={onFormSubmit} />
      <AddressAutocomplete
        mapboxToken='pk.eyJ1IjoidGFnZXN0dWRpbyIsImEiOiJjbTlrM3o5eXUwaWVjMmtzZ3ltcDAwazR6In0.tLphe6RSpLB4jbjdYuBg4g'
        onSelect={(result) => {
          setLocationData(result);
        }}
      />
    </div>
  );
}
