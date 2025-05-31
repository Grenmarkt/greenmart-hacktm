/* eslint-disable @typescript-eslint/no-explicit-any */
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import heroImage from '../components/assets/hero-image.jpg';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/cn';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ChevronsUpDown, Check } from 'lucide-react';
import Navbar from '@/components/NavBar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

const fruits = [
  {
    label: 'Organic Tomato',
    value: 'Organic Tomato',
  },
  {
    label: 'cartofi',
    value: 'cartofi',
  },
];

const cities = [
  {
    label: 'Timișoara',
    value: 'Timisoara',
  },
];

const formSchema = z.object({
  productType: z.string(),
  city: z.string(),
});

function RouteComponent() {
  const navigate = useNavigate();
  const onSubmit = (data: Record<string, any>) => {
    navigate({
      to: '/products',
      search: {
        productType: data['productType'],
        city: data['city'],
      },
    });
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productType: '',
      city: '',
    },
  });

  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar />
      <section
        className='bg-cover bg-center py-16'
        style={{
          backgroundImage: `url(${heroImage})`,
        }}>
        <div className='container mx-auto px-4'>
          <div className='mx-auto max-w-4xl'>
            <div className='rounded-lg bg-white p-6 shadow-lg'>
              <div className='flex items-center gap-4'>
                <div className='relative flex-1'>
                  <div className='mb-6 space-y-3'>
                    <h1 className='text-xl font-bold'>Cauta un produs</h1>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-8'>
                        <div className='flex w-full items-center justify-between'>
                          <FormField
                            control={form.control}
                            name='productType'
                            render={({ field }) => (
                              <FormItem className='flex flex-col'>
                                <FormLabel>Tipul produs</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant='outline'
                                        role='combobox'
                                        className={cn(
                                          'w-[200px] justify-between',
                                          !field.value &&
                                            'text-muted-foreground',
                                        )}>
                                        {field.value ?
                                          fruits.find(
                                            (fruit) =>
                                              fruit.value === field.value,
                                          )?.label
                                        : 'Alege tipul'}
                                        <ChevronsUpDown className='opacity-50' />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className='w-[200px] p-0'>
                                    <Command>
                                      <CommandInput
                                        placeholder='Search framework...'
                                        className='h-9'
                                      />
                                      <CommandList>
                                        <CommandEmpty>
                                          Tipul nu a fost gasit
                                        </CommandEmpty>
                                        <CommandGroup>
                                          {fruits.map((fruit) => (
                                            <CommandItem
                                              value={fruit.label}
                                              key={fruit.value}
                                              onSelect={() => {
                                                form.setValue(
                                                  'productType',
                                                  fruit.value,
                                                );
                                              }}>
                                              {fruit.label}
                                              <Check
                                                className={cn(
                                                  'ml-auto',
                                                  fruit.value === field.value ?
                                                    'opacity-100'
                                                  : 'opacity-0',
                                                )}
                                              />
                                            </CommandItem>
                                          ))}
                                        </CommandGroup>
                                      </CommandList>
                                    </Command>
                                  </PopoverContent>
                                </Popover>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name='city'
                            render={({ field }) => (
                              <FormItem className='flex flex-col'>
                                <FormLabel>Oraș</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant='outline'
                                        role='combobox'
                                        className={cn(
                                          'w-[200px] justify-between',
                                          !field.value &&
                                            'text-muted-foreground',
                                        )}>
                                        {field.value ?
                                          cities.find(
                                            (city) =>
                                              city.value === field.value,
                                          )?.label
                                        : 'Alege orasul'}
                                        <ChevronsUpDown className='opacity-50' />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className='w-[200px] p-0'>
                                    <Command>
                                      <CommandInput
                                        placeholder='Cauta un oraș...'
                                        className='h-9'
                                      />
                                      <CommandList>
                                        <CommandEmpty>
                                          Orașul nu a fost gasit
                                        </CommandEmpty>
                                        <CommandGroup>
                                          {cities.map((city) => (
                                            <CommandItem
                                              value={city.label}
                                              key={city.value}
                                              onSelect={() => {
                                                form.setValue(
                                                  'city',
                                                  city.value,
                                                );
                                              }}>
                                              {city.label}
                                              <Check
                                                className={cn(
                                                  'ml-auto',
                                                  city.value === field.value ?
                                                    'opacity-100'
                                                  : 'opacity-0',
                                                )}
                                              />
                                            </CommandItem>
                                          ))}
                                        </CommandGroup>
                                      </CommandList>
                                    </Command>
                                  </PopoverContent>
                                </Popover>
                              </FormItem>
                            )}
                          />

                          <Button size='lg' type='submit'>
                            Cauta
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className='container mx-auto px-4 py-8'>
        {/* Categories Section */}

        {/* Products Section */}
        {/* <section>
          <h2 className='mb-6 text-2xl font-bold'>Fructe</h2>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-6'>
            {products.map((product) => (
              <div
                key={product.id}
                className='overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg'>
                <div className='flex aspect-square items-center justify-center bg-gradient-to-br from-red-100 to-yellow-100'>
                  <span className='text-4xl lg:text-6xl'>{product.image}</span>
                </div>
                <div className='p-3 lg:p-4'>
                  <h3 className='mb-2 text-sm font-semibold text-gray-800 lg:text-base'>
                    {product.name}
                  </h3>
                  <p className='mb-1 text-xs text-gray-600 lg:text-sm'>
                    {product.brand}, Livada rosii cu fructe
                  </p>
                  <p className='mb-1 text-xs text-gray-600 lg:text-sm'>
                    {product.weight}
                  </p>
                  <p className='mb-3 text-xs font-medium text-gray-800 lg:text-sm'>
                    Preț: {product.price}
                  </p>
                  <Button className='w-full bg-green-600 text-xs text-white hover:bg-green-700 lg:text-sm'>
                    <Plus className='mr-1 h-3 w-3 lg:mr-2 lg:h-4 lg:w-4' />
                    Adaugă în coș
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section> */}
      </main>
    </div>
  );
}
