/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import ProductsList from '@/components/ProductsList';
import Map from '@/components/Map';
import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { createProductsQuery } from '@/api/products/quries';

// Shadcn imports for the command‐style Combobox
import { Check, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import { cn } from '@/lib/cn';

// 1️⃣ Mock product types, each with an `id` (used in query) and a `name` (displayed)
const mockProductTypes = [
  { id: 'Toate', name: 'Toate' },
  { id: 'fructe', name: 'Fructe' },
  { id: 'legume', name: 'Legume' },
  { id: 'lactate', name: 'Lactate' },
  { id: 'cereale', name: 'Cereale' },
  { id: 'carne', name: 'Carne' },
  { id: 'miere_si_gemuri', name: 'Miere și Gemuri' },
  { id: 'muraturi', name: 'Murături' },
  { id: 'sucuri_si_bauturi_alcoolice', name: 'Sucuri și Băuturi Alcoolice' },
];

type ProductSearch = {
  productType: string;
  city: string;
};

export const Route = createFileRoute('/products/')({
  validateSearch: (search: Record<string, unknown>): ProductSearch => {
    // validate and parse the search params into a typed state
    return {
      productType: (search['productType'] as string) ?? 'Toate',
      city: (search['city'] as string) ?? 'Toate',
    };
  },
  loaderDeps: ({ search: { productType, city } }) => ({ productType, city }),
  loader: ({ context, deps }) =>
    // Prefetch “Toate” on initial load
    context.queryClient.ensureQueryData(
      createProductsQuery(deps.productType, deps.city),
    ),
  component: RouteComponent,
});

function RouteComponent() {
  // 2️⃣ Manage state: selectedType (string) and whether the popover is open
  const { productType, city } = Route.useSearch();
  const [selectedType, setSelectedType] = useState<string>(productType);
  const [open, setOpen] = useState<boolean>(false);

  // 3️⃣ Fire a React Query for products every time `selectedType` changes
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery(createProductsQuery(selectedType, city));

  // 4️⃣ Track which product is hovered (for the Map highlight)
  const [hoveredProduct, setHoveredProduct] = useState<Record<
    string,
    any
  > | null>(null);

  return (
    <div className='flex h-screen overflow-hidden'>
      {/* —————————————————————————————
          Left Pane: Command‐style Combobox + Products List
         ————————————————————————————— */}
      <div className='w-3/4 overflow-y-auto p-6'>
        {/* ────────────────────────────
           Shadcn Command‐style Combobox
           ──────────────────────────── */}
        <div className='mb-6 space-y-3'>
          <h1 className='text-xl font-bold'>Cauta un produs</h1>
          <Popover open={open} onOpenChange={setOpen}>
            {/* 1. The button that shows the currently selected type */}
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                role='combobox'
                aria-expanded={open}
                className='w-full justify-between'>
                {mockProductTypes.find((t) => t.id === selectedType)?.name ||
                  'Selectează tip produs'}
                <ChevronsUpDown className='opacity-50' />
              </Button>
            </PopoverTrigger>

            {/* 2. The popover content: an interactive Command list */}
            <PopoverContent className='w-[200px] p-0'>
              <Command>
                <CommandInput
                  placeholder='Caută tip produs...'
                  className='h-9'
                />
                <CommandList>
                  <CommandEmpty>Nu s-a găsit niciun tip.</CommandEmpty>
                  <CommandGroup>
                    {mockProductTypes.map((type) => (
                      <CommandItem
                        key={type.id}
                        value={type.id}
                        onSelect={(currentValue) => {
                          setSelectedType(
                            currentValue === selectedType ? '' : currentValue,
                          );
                          setOpen(false);
                        }}
                        className='flex items-center justify-between'>
                        {type.name}
                        <Check
                          className={cn(
                            'ml-auto',
                            selectedType === type.id ?
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

          <p className='mt-2 text-sm text-gray-600'>
            {isLoading && 'Se încarcă produse…'}
            {isError && `A apărut o eroare: ${error?.message}`}
            {!isLoading && !isError && (
              <>
                Afișăm <span className='font-medium'>{products.length}</span>{' '}
                produse
              </>
            )}
          </p>
        </div>

        {/* ────────────────────────────
           Products List
           ──────────────────────────── */}
        {!isLoading && !isError && (
          <ProductsList
            products={products}
            onProductHover={setHoveredProduct}
          />
        )}
      </div>

      {/* —————————————————————————————
          Right Pane: Map
         ————————————————————————————— */}
      <div className='relative w-3/4'>
        <Map products={products} hoveredProduct={hoveredProduct as any} />
      </div>
    </div>
  );
}

export default RouteComponent;
