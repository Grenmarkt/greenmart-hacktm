/* eslint-disable @typescript-eslint/no-explicit-any */
import { useBecomeSeller } from '@/api/shop/hooks';
import {
  BecomeSellerForm,
  BecomeSellerFormInput,
} from '@/components/BecomeSellerForm';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/become-seller')({
  beforeLoad: ({ context: { authData } }) => {
    if (!authData) {
      throw redirect({ to: '/signin' });
    }
    if (authData.user.role === 'SELLER') {
      throw redirect({ to: '/seller' });
    }
  },
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
      'luni',
      'marti',
      'miercuri',
      'joi',
      'vineri',
      'sambata',
      'duminica',
    ];

    const { name, description, phone, ...times } = data;

    const workIntervals = DAYS.map((day) => ({
      day,
      startTime: (times as any)[`${day}StartTime`],
      endTime: (times as any)[`${day}EndTime`],
    }));

    console.log(locationData);

    mutation.mutate({
      name,
      description,
      phone,
      workIntervals,
      city: locationData!.city!,
      latitude: locationData!.latitude,
      street: locationData!.placeName,
      county: locationData!.placeName,
      longitude: locationData!.longitude,
    });
  };
  return (
    <div className='mx-auto flex w-11/12 flex-col items-center justify-center p-8'>
      <BecomeSellerForm
        setLocationData={setLocationData}
        onSubmit={onFormSubmit}
      />
    </div>
  );
}
