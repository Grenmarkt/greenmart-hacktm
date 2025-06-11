/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createFileRoute,
  Link,
  redirect,
  useMatch,
  useRouteContext,
} from '@tanstack/react-router';
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star, Plus, Edit, MapPin, Clock, Trash2 } from 'lucide-react';
import mapboxgl, { Map, Marker } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Product } from '@/lib/http/models/products';
import { createSellerQuery } from '@/api/shop/queries';
import { useQuery } from '@tanstack/react-query';
import {
  useUpdateShopDescription,
  useUpdateShopWorkIntervals,
} from '@/api/shop/hooks';
import Navbar from '@/components/NavBar';

export const Route = createFileRoute('/seller/')({
  beforeLoad: ({ context: { authData } }) => {
    if (!authData) {
      throw redirect({ to: '/signin' });
    }
    if (authData.user.role !== 'SELLER') {
      throw redirect({ to: '/become-seller' });
    }
    return { authData };
  },
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(
      createSellerQuery(context.authData.user.id),
    ),
  component: RouteComponent,
});

mapboxgl.accessToken =
  'pk.eyJ1IjoidGFnZXN0dWRpbyIsImEiOiJjbTlrM3o5eXUwaWVjMmtzZ3ltcDAwazR6In0.tLphe6RSpLB4jbjdYuBg4g';

interface ProductEdit extends Omit<Product, 'price'> {
  price: string | number;
}

interface Review {
  id: number;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  productName: string;
}

// interface WorkingHours {
//   luni: string;
//   marti: string;
//   miercuri: string;
//   joi: string;
//   vineri: string;
//   sambata: string;
//   duminica: string;
// }

// interface SellerProfile {
//   description: string;
//   location: {
//     lat: number;
//     lng: number;
//     address: string;
//   };
//   workingHours: WorkingHours;
// }

// interface ProfileEdit {
//   description: string;
//   address: string;
//   lat: string;
//   lng: string;
//   workingHours: WorkingHours;
// }

const initialReviews: Review[] = [
  {
    id: 1,
    customerName: 'Maria Popescu',
    rating: 5,
    comment: 'Merele au fost delicioase! Foarte proaspete și dulci.',
    date: '2024-05-20',
    productName: 'Mere Roșii Ecologice',
  },
];

const ProductCard = ({
  product,
  onEdit,
  onDelete,
}: {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}) => {
  return (
    <Card className='w-full transition-shadow hover:shadow-lg'>
      <CardHeader className='pb-3'>
        <div className='flex items-start justify-between'>
          <div className='flex-1'>
            <CardTitle className='line-clamp-2 text-lg font-semibold'>
              {product.title}
            </CardTitle>
            <CardDescription className='mt-1 text-sm text-gray-600'>
              {product.productType.name} • {product.productType.category}
            </CardDescription>
          </div>
          <Badge variant='default' className='bg-green-100 text-green-800'>
            Activ
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className='space-y-3'>
          <img
            src={product.imageUrl!}
            alt={product.title}
            className='h-48 w-full rounded-md bg-gray-100 object-cover'
          />
          <p className='line-clamp-2 text-sm text-gray-600'>
            {product.description}
          </p>
          <div className='flex items-center justify-between'>
            <span className='text-2xl font-bold text-green-600'>
              {product.price.toFixed(2)} RON
            </span>
            <span className='text-2xl font-bold text-green-600'>
              {product.unitType !== 'UNIT' ?
                product.stock.toFixed(2)
              : product.stock.toFixed(0)}{' '}
              {product.unitType === 'UNIT' ? 'Bucati' : product.unitType}
            </span>
          </div>
          <div className='flex items-center gap-1 text-sm text-gray-500'>
            <MapPin className='h-4 w-4' />
            <span>
              {product.city} • {product.street}
            </span>
          </div>
          <div className='flex gap-2 pt-2'>
            <Button
              size='sm'
              variant='outline'
              onClick={() => onEdit(product)}
              className='flex-1'>
              <Edit className='mr-1 h-4 w-4' />
              Editează
            </Button>
            <Button
              size='sm'
              variant='destructive'
              onClick={() => onDelete(product.id)}>
              <Trash2 className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ProductList = ({
  products,
  onEdit,
  onDelete,
}: {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}) => {
  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

const ReviewCard = ({ review }: { review: Review }) => {
  return (
    <Card className='w-full'>
      <CardHeader className='pb-3'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <Avatar className='h-10 w-10'>
              <AvatarFallback className='bg-blue-100 text-blue-600'>
                {review.customerName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className='font-semibold'>{review.customerName}</p>
              <p className='text-sm text-gray-500'>{review.date}</p>
            </div>
          </div>
          <div className='flex items-center gap-1'>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className='mb-2 text-sm font-medium text-blue-600'>
          {review.productName}
        </p>
        <p className='text-gray-800'>{review.comment}</p>
      </CardContent>
    </Card>
  );
};

const LocationPicker: React.FC = () => {
  const mapContainer = React.useRef<HTMLDivElement>(null);
  const mapRef = React.useRef<Map | null>(null);
  const markerRef = React.useRef<Marker | null>(null);
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    if (mapRef.current) return; // initialize only once

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [24.9668, 45.9432], // Romania center
      zoom: 6,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mapRef.current.on('click', (e: any) => {
      const { lng, lat } = e.lngLat;

      // Update marker position
      if (markerRef.current) {
        markerRef.current.setLngLat([lng, lat]);
      } else {
        markerRef.current = new mapboxgl.Marker()
          .setLngLat([lng, lat])
          .addTo(mapRef.current!);
      }

      setCoordinates({ lat, lng });
    });
  }, []);

  const handleSubmit = () => {
    if (coordinates) {
      alert(`Latitude: ${coordinates.lat}, Longitude: ${coordinates.lng}`);
    } else {
      alert('Please select a location on the map.');
    }
  };

  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <label className='block text-sm font-medium'>
          Selectează locația pe hartă
        </label>
        <p className='text-muted-foreground text-sm'>
          Apasă pe hartă pentru a selecta locația sau folosește butoanele de mai
          jos.
        </p>
      </div>

      <div
        ref={mapContainer}
        className='h-[400px] w-full overflow-hidden rounded-xl shadow'
      />

      <Button onClick={handleSubmit} className='w-full'>
        Trimite locația
      </Button>
    </div>
  );
};

type WeekDay =
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY';

const romanianWeekDays: Record<WeekDay, string> = {
  MONDAY: 'Luni',
  TUESDAY: 'Marți',
  WEDNESDAY: 'Miercuri',
  THURSDAY: 'Joi',
  FRIDAY: 'Vineri',
  SATURDAY: 'Sâmbătă',
  SUNDAY: 'Duminică',
};

function toRomanianDay(day: WeekDay): string {
  return romanianWeekDays[day];
}

function RouteComponent() {
  const {
    authData: { user },
  } = useRouteContext({ from: '/seller/' });
  const match = useMatch({ from: '/seller/' });
  const authData = match.context.authData;

  const isUser = !!authData?.user;
  const isSeller = authData?.user.role === 'SELLER';
  const res = useQuery(createSellerQuery(user.id));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const shopInfo = res.data as any;
  const [reviews] = useState<Review[]>(initialReviews);
  const [editingProduct, setEditingProduct] = useState<ProductEdit | null>(
    null,
  );

  const mutateShopDescription = useUpdateShopDescription();
  const [profileDescription, setProfileDescription] = useState<string>(
    shopInfo.description,
  );

  const mutateWorkIntervals = useUpdateShopWorkIntervals();
  const [workIntervals, setWorkIntervals] = useState<
    {
      day: string;
      startTime: string;
      endTime: string;
    }[]
  >(shopInfo.workIntervals);

  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar isSeller={isSeller} isUser={isUser} />
      <div className='mx-auto mt-14 max-w-7xl'>
        <div className='mb-8'>
          <h1 className='mb-2 text-3xl font-bold text-gray-900'>
            Salut, {user.name}
          </h1>
          <p className='text-gray-600'>Gestionează produsele și profilul tau</p>
        </div>

        <div className='mb-8 grid grid-cols-1 gap-6 md:grid-cols-4'>
          <Card>
            <CardHeader className='pb-2'>
              <CardDescription>Total Produse</CardDescription>
              <CardTitle className='text-2xl'>
                {shopInfo.Product.length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className='pb-2'>
              <CardDescription>Rating Mediu</CardDescription>
              <CardTitle className='flex items-center gap-1 text-2xl'>
                {(
                  isNaN(
                    shopInfo.review.reduce(
                      (acc: number, val: { rating: number }) =>
                        acc + val.rating,
                      0,
                    ) / shopInfo.review.length,
                  )
                ) ?
                  '-'
                : shopInfo.review.reduce(
                    (acc: number, val: { rating: number }) => acc + val.rating,
                    0,
                  ) / shopInfo.review.length
                }
                <Star className='h-5 w-5 fill-yellow-400 text-yellow-400' />
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className='pb-2'>
              <CardDescription>Total Review-uri</CardDescription>
              <CardTitle className='text-2xl'>
                {shopInfo.review.length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className='pb-2'>
              <CardDescription>Câștiguri Totale</CardDescription>
              <CardTitle className='text-2xl text-green-600'>0 RON</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Tabs defaultValue='products' className='space-y-6'>
          <TabsList className='grid w-full grid-cols-3'>
            <TabsTrigger value='products'>Produse</TabsTrigger>
            <TabsTrigger value='reviews'>Review-uri</TabsTrigger>
            <TabsTrigger value='profile'>Profil Fermă</TabsTrigger>
          </TabsList>

          <TabsContent value='products' className='space-y-6'>
            <div className='flex items-center justify-between'>
              <h2 className='text-2xl font-bold'>Produsele Tale</h2>
              <Button asChild>
                <Link to='/create-product' className='flex items-center gap-1'>
                  Adaugă Produs
                  <Plus className='h-4 w-4' />
                </Link>
              </Button>
            </div>

            <ProductList
              products={shopInfo.Product}
              onEdit={(() => {}) as any}
              onDelete={(() => {}) as any}
            />

            <Dialog
              open={!!editingProduct}
              onOpenChange={(open) => !open && setEditingProduct(null)}>
              <DialogContent className='max-w-md'>
                <DialogHeader>
                  <DialogTitle>Editează Produs</DialogTitle>
                </DialogHeader>
                {editingProduct && (
                  <div className='grid gap-4 py-4'>
                    <div className='grid gap-2'>
                      <Label>Nume Produs</Label>
                      <Input
                        value={editingProduct.title}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            title: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className='grid gap-2'>
                      <Label>Descriere</Label>
                      <Textarea
                        value={editingProduct.description}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            description: e.target.value,
                          })
                        }
                        rows={3}
                      />
                    </div>
                    <div className='grid gap-2'>
                      <Label>Preț (RON)</Label>
                      <Input
                        type='number'
                        step='0.01'
                        value={editingProduct.price.toString()}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            price: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className='flex gap-2'>
                      <Button onClick={(() => {}) as any} className='flex-1'>
                        Salvează Modificările
                      </Button>
                      <Button
                        variant='outline'
                        onClick={() => setEditingProduct(null)}>
                        Anulează
                      </Button>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value='reviews' className='space-y-6'>
            <h2 className='text-2xl font-bold'>Review-uri Primite</h2>
            <div className='grid gap-4'>
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value='profile' className='space-y-6'>
            <h2 className='text-2xl font-bold'>Profil Fermă</h2>

            <div className='grid gap-6'>
              <Card>
                <CardHeader>
                  <CardTitle>Descrierea Fermei</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <Textarea
                    value={profileDescription}
                    onChange={(e) => setProfileDescription(e.target.value)}
                    rows={4}
                    placeholder='Descrie ferma ta...'
                  />
                  <Button
                    onClick={() =>
                      mutateShopDescription.mutate(profileDescription)
                    }>
                    Salvează Descrierea
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <MapPin className='h-5 w-5' />
                    Locația Fermei
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='space-y-2'>
                    <LocationPicker />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Clock className='h-5 w-5' />
                    Orarul de Funcționare
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='grid gap-3'>
                    {workIntervals.map(({ day, startTime, endTime }, i) => (
                      <div key={day} className='grid grid-cols-3 gap-6'>
                        <Label className='text-lg font-semibold'>
                          {toRomanianDay(day as WeekDay)}
                        </Label>
                        <div className='flex flex-col items-center gap-2'>
                          <Label className='capitalize'>De la</Label>
                          <Input
                            type='time'
                            className='text-center'
                            value={startTime}
                            onChange={(e) =>
                              setWorkIntervals(
                                workIntervals.map((day, j) => {
                                  if (i !== j) return day;
                                  return { ...day, startTime: e.target.value };
                                }),
                              )
                            }
                            placeholder='ex. 08:00-18:00 sau Închis'
                          />
                        </div>
                        <div className='flex flex-col items-center gap-2'>
                          <Label className='capitalize'>Pana la</Label>
                          <Input
                            type='time'
                            className='text-center'
                            value={endTime}
                            onChange={(e) =>
                              setWorkIntervals(
                                workIntervals.map((day, j) => {
                                  if (i !== j) return day;
                                  return { ...day, endTime: e.target.value };
                                }),
                              )
                            }
                            placeholder='ex. 08:00-18:00 sau Închis'
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() => {
                      mutateWorkIntervals.mutate(workIntervals);
                    }}>
                    Salvează Orarul
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
