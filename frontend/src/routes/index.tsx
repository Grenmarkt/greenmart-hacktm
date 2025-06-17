/* eslint-disable @typescript-eslint/no-explicit-any */
import { createFileRoute, useMatch, useNavigate } from '@tanstack/react-router';
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
import { CategoryCard } from '@/components/CategoryCard';
import legumeImg from '../components/assets/legume.jpg';
import fructeImg from '../components/assets/fructe.jpg';
import carneImg from '../components/assets/carne.jpg';
import bauturiImg from '../components/assets/sucuri.jpg';
import lactateImg from '../components/assets/lactate.jpg';

export const Route = createFileRoute('/')({
  beforeLoad: ({ context }) => ({ authData: context.authData }),
  component: RouteComponent,
});

const quickSearches = [
  {
    title: 'Legume',
    category: 'VEGETABLE',
    img: legumeImg,
  },
  {
    title: 'Fructe',
    category: 'FRUIT',
    img: fructeImg,
  },
  {
    title: 'Carne',
    category: 'MEAT',
    img: carneImg,
  },
  {
    title: 'Lactate',
    category: 'DAIRY',
    img: lactateImg,
  },
  {
    title: 'Bauturi',
    category: 'BEVERAGE',
    img: bauturiImg,
  },
];

const products = [
  { label: 'Rosii Cherry Bio', value: 'Rosii Cherry Bio' },
  { label: 'Castraveti Sera Bio', value: 'Castraveti Sera Bio' },
  { label: 'Ardei Gras Rosu Bio', value: 'Ardei Gras Rosu Bio' },
  { label: 'Mere Ionatan Bio', value: 'Mere Ionatan Bio' },
  { label: 'Pere Williams Bio', value: 'Pere Williams Bio' },
  { label: 'Cirese Pata Negra Bio', value: 'Cirese Pata Negra Bio' },
  { label: 'Pui de Tara Bio', value: 'Pui de Tara Bio' },
  { label: 'Carne de Porc Bio', value: 'Carne de Porc Bio' },
  { label: 'Miel de Tara Bio', value: 'Miel de Tara Bio' },
  { label: 'Branza de Vaci Bio', value: 'Branza de Vaci Bio' },
  { label: 'Lapte de Tara Bio', value: 'Lapte de Tara Bio' },
  { label: 'Iaurt de Casa Bio', value: 'Iaurt de Casa Bio' },
  { label: 'Suc de Mere 100% Bio', value: 'Suc de Mere 100% Bio' },
  { label: 'Kombucha Taranesca Bio', value: 'Kombucha Taranesca Bio' },
  { label: 'Limonada cu Mure Bio', value: 'Limonada cu Mure Bio' },
];

const cities = [
  { label: 'București', value: 'București' },
  { label: 'Cluj-Napoca', value: 'Cluj-Napoca' },
  { label: 'Timișoara', value: 'Timișoara' },
  { label: 'Iași', value: 'Iași' },
  { label: 'Constanța', value: 'Constanța' },
  { label: 'Craiova', value: 'Craiova' },
  { label: 'Brașov', value: 'Brașov' },
  { label: 'Galați', value: 'Galați' },
  { label: 'Ploiești', value: 'Ploiești' },
  { label: 'Oradea', value: 'Oradea' },
  { label: 'Brăila', value: 'Brăila' },
  { label: 'Arad', value: 'Arad' },
  { label: 'Pitești', value: 'Pitești' },
  { label: 'Sibiu', value: 'Sibiu' },
  { label: 'Bacău', value: 'Bacău' },
  { label: 'Buzău', value: 'Buzău' },
  { label: 'Satu Mare', value: 'Satu Mare' },
  { label: 'Botoșani', value: 'Botoșani' },
  { label: 'Târgu Mureș', value: 'Târgu Mureș' },
  { label: 'Baia Mare', value: 'Baia Mare' },
  { label: 'Râmnicu Vâlcea', value: 'Râmnicu Vâlcea' },
  { label: 'Suceava', value: 'Suceava' },
];

const formSchema = z.object({
  productType: z.string(),
  city: z.string(),
});

function RouteComponent() {
  const navigate = useNavigate();

  const match = useMatch({ from: '/' });
  const authData = match.context.authData;

  const isUser = !!authData?.user;
  const isSeller = authData?.user.role === 'SELLER';

  const onSubmit = (data: Record<string, any>) => {
    navigate({
      to: '/products',
      search: {
        productType: data['productType'],
        city: data['city'],
        category: 'Toate',
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
      <Navbar isSeller={isSeller} isUser={isUser} />
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
                        <div className='flex w-full items-center gap-4'>
                          <FormField
                            control={form.control}
                            name='productType'
                            render={({ field }) => (
                              <FormItem className='flex flex-1 flex-col'>
                                <FormLabel>Tip produs</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant='outline'
                                        role='combobox'
                                        className={cn(
                                          'w-full justify-between',
                                          !field.value &&
                                            'text-muted-foreground',
                                        )}>
                                        {field.value ?
                                          products.find(
                                            (p) => p.value === field.value,
                                          )?.label
                                        : 'Alege tipul'}
                                        <ChevronsUpDown className='opacity-50' />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className='w-full p-0'>
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
                                          {products.map((product) => (
                                            <CommandItem
                                              value={product.label}
                                              key={product.value}
                                              onSelect={() => {
                                                form.setValue(
                                                  'productType',
                                                  product.value,
                                                );
                                              }}>
                                              {product.label}
                                              <Check
                                                className={cn(
                                                  'ml-auto',
                                                  (
                                                    product.value ===
                                                      field.value
                                                  ) ?
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
                              <FormItem className='flex flex-1 flex-col'>
                                <FormLabel>Oraș</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant='outline'
                                        role='combobox'
                                        className={cn(
                                          'w-full justify-between',
                                          !field.value &&
                                            'text-muted-foreground',
                                        )}>
                                        {field.value ?
                                          cities.find(
                                            (c) => c.value === field.value,
                                          )?.label
                                        : 'Alege orașul'}
                                        <ChevronsUpDown className='opacity-50' />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className='w-full p-0'>
                                    <Command>
                                      <CommandInput
                                        placeholder='Caută un oraș...'
                                        className='h-9'
                                      />
                                      <CommandList>
                                        <CommandEmpty>
                                          Orașul nu a fost găsit
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

                          <Button size='lg' className='self-end'>
                            Caută
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
        <div className='mt-10 space-y-8'>
          <h2 className='text-3xl font-semibold'>Categorii Super Rapide</h2>
          <div className='flex w-full flex-wrap items-center justify-center gap-8 md:justify-between'>
            {quickSearches.map((quickSearch) => (
              <CategoryCard
                key={quickSearch.title}
                title={quickSearch.title}
                categoryValue={quickSearch.category}
                imageSrc={quickSearch.img}
              />
            ))}
          </div>
        </div>

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
