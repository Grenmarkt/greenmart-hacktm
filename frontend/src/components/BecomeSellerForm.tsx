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

const formSchema = z.object({
  name: z.string().min(1, 'Numele este obligatoriu'),
  description: z.string().optional(),
  mondayStartTime: z.string().min(1, 'Obligatoriu'),
  mondayEndTime: z.string().min(1, 'Obligatoriu'),
  tuesdayStartTime: z.string().min(1, 'Obligatoriu'),
  tuesdayEndTime: z.string().min(1, 'Obligatoriu'),
  wednesdayStartTime: z.string().min(1, 'Obligatoriu'),
  wednesdayEndTime: z.string().min(1, 'Obligatoriu'),
  thursdayStartTime: z.string().min(1, 'Obligatoriu'),
  thursdayEndTime: z.string().min(1, 'Obligatoriu'),
  fridayStartTime: z.string().min(1, 'Obligatoriu'),
  fridayEndTime: z.string().min(1, 'Obligatoriu'),
  saturdayStartTime: z.string().min(1, 'Obligatoriu'),
  saturdayEndTime: z.string().min(1, 'Obligatoriu'),
  sundayStartTime: z.string().min(1, 'Obligatoriu'),
  sundayEndTime: z.string().min(1, 'Obligatoriu'),
  phone: z.string().min(1, 'Telefonul este obligatoriu'),
});

export type BecomeSellerFormInput = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (data: BecomeSellerFormInput) => void;
};

export function BecomeSellerForm({ onSubmit }: Props) {
  const form = useForm<BecomeSellerFormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      mondayStartTime: '',
      mondayEndTime: '',
      tuesdayStartTime: '',
      tuesdayEndTime: '',
      wednesdayStartTime: '',
      wednesdayEndTime: '',
      thursdayStartTime: '',
      thursdayEndTime: '',
      fridayStartTime: '',
      fridayEndTime: '',
      saturdayStartTime: '',
      saturdayEndTime: '',
      sundayStartTime: '',
      sundayEndTime: '',
      phone: '',
    },
  });

  return (
    <Card className='w-[80%] max-w-3xl px-8 py-10'>
      <CardHeader>
        <CardTitle className='text-2xl'>Date Magazin</CardTitle>
      </CardHeader>
      <CardContent>
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
                  name='mondayStartTime'
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
                  name='mondayEndTime'
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
                  name='tuesdayStartTime'
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
                  name='tuesdayEndTime'
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
                  name='wednesdayStartTime'
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
                  name='wednesdayEndTime'
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
                  name='thursdayStartTime'
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
                  name='thursdayEndTime'
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
                  name='fridayStartTime'
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
                  name='fridayEndTime'
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
                  name='saturdayStartTime'
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
                  name='saturdayEndTime'
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
                  name='sundayStartTime'
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
                  name='sundayEndTime'
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
