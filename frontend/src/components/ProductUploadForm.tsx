import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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

import { Input } from './ui/input';
import { cn } from '@/lib/cn';
import { Check, ChevronsUpDown } from 'lucide-react';
import FileUploader from './FileUploader';

type propType = {
  onSubmit: (data: ProductUploadFormInput) => void;
};

const formSchema = z.object({
  productType: z.string(),
  title: z.string(),
  description: z.string().optional(),
  price: z.coerce.number().min(0),
  unitType: z.string(),
  stock: z.coerce.number().min(0),
  image: z
    .array(z.custom<File>())
    .min(1)
    .max(1)
    .refine((files) => files.every((file) => file.size <= 5 * 1024 * 1024), {
      message: 'Imaginea trebuie sa fie de maxim 5MB',
      path: ['image'],
    }),
});

export type ProductUploadFormInput = z.infer<typeof formSchema>;

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

export function ProductUploadForm({ onSubmit }: propType) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productType: '',
      title: '',
      description: '',
      price: 0,
      unitType: '',
      stock: 0,
      image: [],
    },
  });
  return (
    <Card className='w-[80%] max-w-3xl px-8 py-10'>
      <CardHeader>
        <CardTitle className='text-2xl'>Adauga un produs</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='productType'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Tipul produsului</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant='outline'
                          role='combobox'
                          className={cn(
                            'w-[200px] justify-between',
                            !field.value && 'text-muted-foreground',
                          )}>
                          {field.value ?
                            products.find(
                              (product) => product.value === field.value,
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
                          <CommandEmpty>Tipul nu a fost gasit</CommandEmpty>
                          <CommandGroup>
                            {products.map((product) => (
                              <CommandItem
                                value={product.label}
                                key={product.value}
                                onSelect={() => {
                                  form.setValue('productType', product.value);
                                }}>
                                {product.label}
                                <Check
                                  className={cn(
                                    'ml-auto',
                                    product.value === field.value ?
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
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titlu</FormLabel>
                  <FormControl>
                    <Input placeholder='shadcn' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrierea</FormLabel>
                  <FormControl>
                    <Input placeholder='shadcn' {...field} />
                  </FormControl>
                  <FormDescription>Descrierea este optionala</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pret</FormLabel>
                  <FormControl>
                    <Input placeholder='shadcn' type='number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='unitType'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unitate de masura</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Alege unitatea de masura' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='KG'>Kilogram</SelectItem>
                      <SelectItem value='UNIT'>Bucata</SelectItem>
                      <SelectItem value='G'>Gram</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='stock'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cantitate in stoc</FormLabel>
                  <FormControl>
                    <Input placeholder='shadcn' type='number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='image'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Poza produs</FormLabel>
                  <FormControl>
                    <FileUploader
                      value={field.value}
                      onValueChange={field.onChange}
                      accept='image/*'
                      maxFiles={1}
                      maxSize={5 * 1024 * 1024}
                      allowMultipleFiles={false}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type='submit'>Publica produsul</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
