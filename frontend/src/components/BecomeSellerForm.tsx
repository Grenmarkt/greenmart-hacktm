import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { AddressAutocomplete } from './AddressAutocomplete';

const formSchema = z.object({
  name: z.string().min(1, 'Numele este obligatoriu'),
  description: z.string().optional(),
  luniStartTime: z.string().min(1, 'Obligatoriu'),
  luniEndTime: z.string().min(1, 'Obligatoriu'),
  martiStartTime: z.string().min(1, 'Obligatoriu'),
  martiEndTime: z.string().min(1, 'Obligatoriu'),
  miercuriStartTime: z.string().min(1, 'Obligatoriu'),
  miercuriEndTime: z.string().min(1, 'Obligatoriu'),
  joiStartTime: z.string().min(1, 'Obligatoriu'),
  joiEndTime: z.string().min(1, 'Obligatoriu'),
  vineriStartTime: z.string().min(1, 'Obligatoriu'),
  vineriEndTime: z.string().min(1, 'Obligatoriu'),
  sambataStartTime: z.string().min(1, 'Obligatoriu'),
  sambataEndTime: z.string().min(1, 'Obligatoriu'),
  duminicaStartTime: z.string().min(1, 'Obligatoriu'),
  duminicaEndTime: z.string().min(1, 'Obligatoriu'),
  phone: z.string().min(1, 'Telefonul este obligatoriu'),
});

export type BecomeSellerFormInput = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (data: BecomeSellerFormInput) => void;
  setLocationData: React.Dispatch<
    React.SetStateAction<{
      latitude: number;
      longitude: number;
      city: string | null;
      placeName: string;
    } | null>
  >;
};

export function BecomeSellerForm({ onSubmit, setLocationData }: Props) {
  const form = useForm<BecomeSellerFormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      luniStartTime: '',
      luniEndTime: '',
      martiStartTime: '',
      martiEndTime: '',
      miercuriStartTime: '',
      miercuriEndTime: '',
      joiStartTime: '',
      joiEndTime: '',
      vineriStartTime: '',
      vineriEndTime: '',
      sambataStartTime: '',
      sambataEndTime: '',
      duminicaStartTime: '',
      duminicaEndTime: '',
      phone: '',
    },
  });

  return (
    <Card className='w-[80%] max-w-3xl px-8 py-10'>
      <CardHeader>
        <CardTitle className='text-2xl'>Date Magazin</CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <AddressAutocomplete
          mapboxToken='pk.eyJ1IjoidGFnZXN0dWRpbyIsImEiOiJjbTlrM3o5eXUwaWVjMmtzZ3ltcDAwazR6In0.tLphe6RSpLB4jbjdYuBg4g'
          onSelect={(result) => {
            setLocationData(result);
          }}
        />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            {/* Nume magazin */}
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nume Magazin</FormLabel>
                  <FormControl>
                    <Input placeholder='Ex: Piața Centrală' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Descriere (opțional) */}
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descriere</FormLabel>
                  <FormControl>
                    <Input placeholder='Descriere magazin...' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Telefon */}
            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefon</FormLabel>
                  <FormControl>
                    <Input placeholder='07xx xxx xxx' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Ore lucrătoare: câte un rând grey-accent pentru fiecare zi */}
            <div className='space-y-4'>
              {/* Luni */}
              <div className='grid grid-cols-3 items-center gap-6 rounded-md border-2 px-4 py-3'>
                <span className='font-medium'>Luni</span>
                <FormField
                  control={form.control}
                  name='luniStartTime'
                  render={({ field }) => (
                    <FormItem className='flex flex-col items-center'>
                      <FormLabel className=''>De la</FormLabel>
                      <FormControl>
                        <Input
                          type='time'
                          {...field}
                          className='w-[120px] text-center'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='luniEndTime'
                  render={({ field }) => (
                    <FormItem className='flex flex-col items-center'>
                      <FormLabel className=''>Până la</FormLabel>
                      <FormControl>
                        <Input
                          type='time'
                          {...field}
                          className='w-[120px] text-center'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Marți */}
              <div className='grid grid-cols-3 items-center gap-6 rounded-md border-2 px-4 py-3'>
                <span className='font-medium'>Marți</span>
                <FormField
                  control={form.control}
                  name='martiStartTime'
                  render={({ field }) => (
                    <FormItem className='flex flex-col items-center'>
                      <FormLabel className=''>De la</FormLabel>
                      <FormControl>
                        <Input
                          type='time'
                          {...field}
                          className='w-[120px] text-center'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='martiEndTime'
                  render={({ field }) => (
                    <FormItem className='flex flex-col items-center'>
                      <FormLabel className=''>Până la</FormLabel>
                      <FormControl>
                        <Input
                          type='time'
                          {...field}
                          className='w-[120px] text-center'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Miercuri */}
              <div className='grid grid-cols-3 items-center gap-6 rounded-md border-2 px-4 py-3'>
                <span className='font-medium'>Miercuri</span>
                <FormField
                  control={form.control}
                  name='miercuriStartTime'
                  render={({ field }) => (
                    <FormItem className='flex flex-col items-center'>
                      <FormLabel className=''>De la</FormLabel>
                      <FormControl>
                        <Input
                          type='time'
                          {...field}
                          className='w-[120px] text-center'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='miercuriEndTime'
                  render={({ field }) => (
                    <FormItem className='flex flex-col items-center'>
                      <FormLabel className=''>Până la</FormLabel>
                      <FormControl>
                        <Input
                          type='time'
                          {...field}
                          className='w-[120px] text-center'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Joi */}
              <div className='grid grid-cols-3 items-center gap-6 rounded-md border-2 px-4 py-3'>
                <span className='font-medium'>Joi</span>
                <FormField
                  control={form.control}
                  name='joiStartTime'
                  render={({ field }) => (
                    <FormItem className='flex flex-col items-center'>
                      <FormLabel className=''>De la</FormLabel>
                      <FormControl>
                        <Input
                          type='time'
                          {...field}
                          className='w-[120px] text-center'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='joiEndTime'
                  render={({ field }) => (
                    <FormItem className='flex flex-col items-center'>
                      <FormLabel className=''>Până la</FormLabel>
                      <FormControl>
                        <Input
                          type='time'
                          {...field}
                          className='w-[120px] text-center'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Vineri */}
              <div className='grid grid-cols-3 items-center gap-6 rounded-md border-2 px-4 py-3'>
                <span className='font-medium'>Vineri</span>
                <FormField
                  control={form.control}
                  name='vineriStartTime'
                  render={({ field }) => (
                    <FormItem className='flex flex-col items-center'>
                      <FormLabel className=''>De la</FormLabel>
                      <FormControl>
                        <Input
                          type='time'
                          {...field}
                          className='w-[120px] text-center'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='vineriEndTime'
                  render={({ field }) => (
                    <FormItem className='flex flex-col items-center'>
                      <FormLabel className=''>Până la</FormLabel>
                      <FormControl>
                        <Input
                          type='time'
                          {...field}
                          className='w-[120px] text-center'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Sâmbătă */}
              <div className='grid grid-cols-3 items-center gap-6 rounded-md border-2 px-4 py-3'>
                <span className='font-medium'>Sâmbătă</span>
                <FormField
                  control={form.control}
                  name='sambataStartTime'
                  render={({ field }) => (
                    <FormItem className='flex flex-col items-center'>
                      <FormLabel className=''>De la</FormLabel>
                      <FormControl>
                        <Input
                          type='time'
                          {...field}
                          className='w-[120px] text-center'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='sambataEndTime'
                  render={({ field }) => (
                    <FormItem className='flex flex-col items-center'>
                      <FormLabel className=''>Până la</FormLabel>
                      <FormControl>
                        <Input
                          type='time'
                          {...field}
                          className='w-[120px] text-center'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Duminică */}
              <div className='grid grid-cols-3 items-center gap-6 rounded-md border-2 px-4 py-3'>
                <span className='font-medium'>Duminică</span>
                <FormField
                  control={form.control}
                  name='duminicaStartTime'
                  render={({ field }) => (
                    <FormItem className='flex flex-col items-center'>
                      <FormLabel className=''>De la</FormLabel>
                      <FormControl>
                        <Input
                          type='time'
                          {...field}
                          className='w-[120px] text-center'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='duminicaEndTime'
                  render={({ field }) => (
                    <FormItem className='flex flex-col items-center'>
                      <FormLabel className=''>Până la</FormLabel>
                      <FormControl>
                        <Input
                          type='time'
                          {...field}
                          className='w-[120px] text-center'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button type='submit' className='mt-4'>
              Devino producător
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
