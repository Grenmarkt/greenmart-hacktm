import {
  createFileRoute,
  Link,
  redirect,
  useRouteContext,
} from '@tanstack/react-router';
import { createOrderProductsQuery } from '@/api/order/queries';
import { useQuery } from '@tanstack/react-query';
import { queryClient } from '@/api/client';
import {
  ArrowLeft,
  CreditCard,
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Product } from '@/lib/http/models/products';

export const Route = createFileRoute('/cart')({
  component: RouteComponent,
  loader: ({ context }) => {
    const userID = context.authData?.user.id;
    if (!userID) {
      throw redirect({ to: '/' });
    }
    return context.queryClient.ensureQueryData(
      createOrderProductsQuery(userID),
    );
  },
});

export interface CartItem {
  product: Product;
  quantity: number;
}

function RouteComponent() {
  const { authData } = useRouteContext({ from: '/cart' });
  const userId = authData?.user.id;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: cartItems = [] } = useQuery({
    ...createOrderProductsQuery(userId!),
    enabled: !!userId,
  });
  console.log(cartItems);
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }

    queryClient.setQueryData<CartItem[]>(
      ['products', userId],
      (oldData) =>
        oldData?.map((item) =>
          item.product.id === id ? { ...item, quantity: newQuantity } : item,
        ) ?? [],
    );
  };

  const removeItem = (id: string) => {
    queryClient.setQueryData<CartItem[]>(
      ['products', userId],
      (oldData) => oldData?.filter((item) => item.product.id !== id) ?? [],
    );
  };

  // const shipping = subtotal > 500 ? 0 : 29.99;
  // const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className='min-h-screen bg-gray-50 py-8'>
        <div className='container mx-auto max-w-4xl px-4'>
          <div className='py-16 text-center'>
            <ShoppingCart className='mx-auto mb-6 h-24 w-24 text-gray-400' />
            <h2 className='mb-4 text-2xl font-bold text-gray-900'>
              Coșul tău este gol
            </h2>
            <p className='mb-8 text-gray-600'>
              Adaugă produse pentru a începe cumpărăturile
            </p>
            <Link to='/'>
              <Button size='lg' className='bg-green-600 hover:bg-green-700'>
                Continuă cumpărăturile
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='container mx-auto max-w-6xl px-4'>
        {/* Header */}
        <div className='mb-8 flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <Link to='/'>
              <Button variant='outline' size='sm'>
                <ArrowLeft className='mr-2 h-4 w-4' />
                Înapoi la produse
              </Button>
            </Link>
            <h1 className='text-3xl font-bold text-gray-900'>Coșul meu</h1>
          </div>
          <Badge variant='secondary' className='text-sm'>
            {cartItems.length} {cartItems.length === 1 ? 'produs' : 'produse'}
          </Badge>
        </div>

        <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
          {/* Cart Items */}
          <div className='space-y-4 lg:col-span-2'>
            {cartItems.map((item) => (
              <Card key={item.product.id} className='overflow-hidden'>
                <CardContent className='p-6'>
                  <div className='flex gap-4'>
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.title}
                      className='h-24 w-24 rounded-lg object-cover'
                    />
                    <div className='flex-1'>
                      <div className='mb-2 flex items-start justify-between'>
                        <div>
                          <h3 className='text-lg font-semibold text-gray-900'>
                            {item.product.title}
                          </h3>
                          <Badge variant='outline' className='mt-1'>
                            {item.product.productType.category}
                          </Badge>
                        </div>
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={() => removeItem(item.product.id)}
                          className='text-red-500 hover:bg-red-50 hover:text-red-700'>
                          <Trash2 className='h-4 w-4' />
                        </Button>
                      </div>

                      <div className='mt-4 flex items-center justify-between'>
                        <div className='flex items-center rounded-lg border'>
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() => updateQuantity(item.product.id, -1)}
                            className='h-10 w-10 p-0'>
                            <Minus className='h-4 w-4' />
                          </Button>
                          <span className='min-w-[3rem] px-4 py-2 text-center font-medium'>
                            {item.quantity}
                          </span>
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            className='h-10 w-10 p-0'>
                            <Plus className='h-4 w-4' />
                          </Button>
                        </div>
                        <div className='text-right'>
                          <div className='text-2xl font-bold text-gray-900'>
                            {/* {(item.price * item.quantity).toLocaleString(
                              'ro-RO',
                              {
                                style: 'currency',
                                currency: 'RON',
                              },
                            )} */}
                          </div>
                          <div className='text-sm text-gray-500'>
                            {/* {item.price.toLocaleString('ro-RO', {
                              style: 'currency',
                              currency: 'RON',
                            })}{' '}
                            / bucată */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className='space-y-6'>
            <Card>
              <CardHeader>
                <CardTitle>Sumar comandă</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex justify-between'>
                  <span>Subtotal</span>
                  <span className='font-medium'>
                    {/* {subtotal.toLocaleString('ro-RO', {
                      style: 'currency',
                      currency: 'RON',
                    })} */}
                  </span>
                </div>

                <div className='flex justify-between'>
                  <span>Livrare</span>
                  <span className='font-medium'>
                    {/* {shipping === 0 ?
                      'GRATUIT'
                    : shipping.toLocaleString('ro-RO', {
                        style: 'currency',
                        currency: 'RON',
                      })
                    } */}
                  </span>
                </div>

                {/* {shipping === 0 && (
                  <div className='text-sm text-green-600'>
                    ✓ Livrare gratuită pentru comenzi peste 500 RON
                  </div>
                )} */}

                <Separator />

                <div className='flex justify-between text-lg font-bold'>
                  <span>Total</span>
                  <span>
                    {/* {total.toLocaleString('ro-RO', {
                      style: 'currency',
                      currency: 'RON',
                    })} */}
                  </span>
                </div>

                <Button
                  className='w-full bg-green-600 hover:bg-green-700'
                  size='lg'>
                  <CreditCard className='mr-2 h-5 w-5' />
                  Finalizează comanda
                </Button>

                <div className='text-center'>
                  <Link to='/'>
                    <Button variant='outline' className='w-full'>
                      Continuă cumpărăturile
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
