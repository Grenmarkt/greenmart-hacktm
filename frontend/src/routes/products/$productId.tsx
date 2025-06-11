import { createProductQuery } from '@/api/products/quries';
import { useQuery } from '@tanstack/react-query';
import {
  createFileRoute,
  redirect,
  useRouteContext,
} from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import StarRating from '@/components/StarRating';
import { Product } from '@/lib/http/models/products';
import React from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useCreateOrderProduct } from '@/api/order/hooks';
import { toast } from 'sonner';

export const Route = createFileRoute('/products/$productId')({
  loader: ({ context, params }) => {
    return context.queryClient.ensureQueryData(
      createProductQuery(params.productId),
    );
  },
  component: RouteComponent,
});

// Componenta pentru harta mică ce afișează locația fermei
const FarmLocationMap: React.FC<{ lat: number; lng: number }> = ({
  lat,
  lng,
}) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoidGFnZXN0dWRpbyIsImEiOiJjbTlrM3o5eXUwaWVjMmtzZ3ltcDAwazR6In0.tLphe6RSpLB4jbjdYuBg4g';
  const mapContainerRef = React.useRef<HTMLDivElement>(null);
  const mapRef = React.useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current && mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: 12,
      });

      new mapboxgl.Marker().setLngLat([lng, lat]).addTo(mapRef.current);
    }

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [lat, lng]);

  return (
    <div className='h-96 w-full overflow-hidden rounded-2xl shadow-md'>
      <div ref={mapContainerRef} className='h-full w-full' />
    </div>
  );
};

// Mock data pentru recenzii
const mockReviews = [
  {
    id: 1,
    name: 'Maria Popescu',
    rating: 5,
    date: '2 săptămâni în urmă',
    comment:
      'Produse excepționale! Calitate superioară și gustul este fantastic. Voi comanda din nou cu siguranță.',
    verified: true,
  },
  {
    id: 2,
    name: 'Ion Dumitrescu',
    rating: 4,
    date: '3 săptămâni în urmă',
    comment:
      'Foarte mulțumit de calitate. Produsele sunt proaspete și livrarea a fost la timp.',
    verified: true,
  },
  {
    id: 3,
    name: 'Ana Gheorghiu',
    rating: 5,
    date: '1 lună în urmă',
    comment:
      'Cea mai bună alegere pentru produse locale! Fermierul este foarte amabil și profesionist.',
    verified: false,
  },
];

// Componenta pentru secțiunea de recenzii
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ReviewsSection({ }: { product: Product }) {
  const MOCK_REVIEW = 5;
  return (
    <div className='py-6'>
      <div className='mb-6'>
        <div className='mb-4 flex items-center justify-between'>
          <h3 className='text-xl font-semibold'>
            Recenzii clienți ({MOCK_REVIEW})
          </h3>
          <button className='rounded-lg bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700'>
            Scrie o recenzie
          </button>
        </div>

        {/* Rating summary */}
        <div className='mb-6 rounded-lg bg-gray-50 p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <div className='mb-2 text-3xl font-bold'>{MOCK_REVIEW}</div>
              <StarRating />
            </div>
            <div className='text-right'>
              <div className='mb-2 text-sm text-gray-600'>
                Distribuția ratingurilor:
              </div>
              {[5, 4, 3, 2, 1].map((stars) => (
                <div key={stars} className='flex items-center text-sm'>
                  <span className='w-3'>{stars}</span>
                  <svg
                    className='mx-1 h-3 w-3 text-yellow-400'
                    fill='currentColor'
                    viewBox='0 0 20 20'>
                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                  </svg>
                  <div className='mx-2 h-2 w-16 rounded-full bg-gray-200'>
                    <div
                      className='h-2 rounded-full bg-yellow-400'
                      style={{ width: `${Math.random() * 80 + 20}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Individual reviews */}
      <div className='space-y-6'>
        {mockReviews.map((review) => (
          <div key={review.id} className='border-b border-gray-200 pb-6'>
            <div className='mb-2 flex items-start justify-between'>
              <div className='flex items-center'>
                <div className='mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-100'>
                  <span className='text-sm font-semibold text-green-600'>
                    {review.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </span>
                </div>
                <div>
                  <div className='flex items-center'>
                    <span className='mr-2 font-medium'>{review.name}</span>
                    {review.verified && (
                      <span className='rounded bg-green-100 px-2 py-1 text-xs text-green-700'>
                        Cumpărător verificat
                      </span>
                    )}
                  </div>
                  <div className='flex items-center text-sm text-gray-500'>
                    <StarRating />
                    <span className='ml-2'>{review.date}</span>
                  </div>
                </div>
              </div>
            </div>
            <p className='ml-13 text-gray-700'>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function RouteComponent() {
  const MOCK_RATING = 5;
  const mutation = useCreateOrderProduct();
  const { authData } = useRouteContext({ from: '/products/$productId' });
  const userId = authData?.user.id;
  const { productId } = Route.useParams();
  const product = useQuery(createProductQuery(productId)).data;
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');

  if (!product) {
    return (
      <Link to='/' className='text-primary hover:underline'>
        Înapoi la pagina principală
      </Link>
    );
  }

  const handleIncreaseQuantity = () => setQuantity((prev) => prev + 1);
  const handleDecreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const handleAddToCart = () => {
    if (!userId) {
      toast.error('Nu esti autentificat');
      throw redirect({ to: '/signin' });
    }
    mutation.mutate({ userId, productId, quantity });
    toast('Produsul a fost adaugat in cont cu cantitatea dorita');
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Product content - Grid layout */}
      <div className='grid grid-cols-1 gap-10 md:grid-cols-2'>
        {/* Left column - Product gallery */}
        <div>
          <div className='mb-4 h-96 w-full overflow-hidden rounded-lg bg-gray-100'>
            <img
              src={product.imageUrl ?? '/placeholder-image.jpg'}
              alt='Produs'
              className='h-full w-full object-cover'
            />
          </div>
        </div>

        {/* Right column - Product details */}
        <div>
          <h1 className='mb-2 text-3xl font-bold'>{product.title}</h1>
          <p className='mb-4 text-gray-600'>
            De la <span className='font-medium'>{product.shop!.name}</span>
          </p>

          <StarRating />

          <div className='my-6'>
            <h2 className='text-primary text-2xl font-bold'>
              {product.price.toFixed(2)} lei
            </h2>
            <p className='mt-1 text-sm text-gray-500'>Preț pe kilogram</p>
          </div>

          <p className='mb-6 text-gray-700'>{product.description}</p>

          {/* Quantity selector */}
          <div className='mb-6 flex items-center'>
            <span className='mr-4 font-medium'>Cantitate:</span>
            <div className='flex items-center'>
              <button
                onClick={handleDecreaseQuantity}
                className='rounded-l border border-gray-300 px-3 py-2 hover:bg-gray-100'>
                -
              </button>
              <span className='border-t border-b border-gray-300 px-4 py-2'>
                {quantity}
              </span>
              <button
                onClick={handleIncreaseQuantity}
                className='rounded-r border border-gray-300 px-3 py-2 hover:bg-gray-100'>
                +
              </button>
            </div>
          </div>

          {/* Add to cart button */}
          <button
            onClick={handleAddToCart}
            className='w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700'>
            Adaugă în coș
          </button>

          {/* Farm information */}
        </div>
      </div>

      {/* Product details tabs */}
      <div className='mt-16'>
        <div className='border-b border-gray-200'>
          <nav className='flex space-x-8'>
            <button
              onClick={() => setActiveTab('details')}
              className={`border-b-2 px-1 py-4 font-medium ${
                activeTab === 'details' ?
                  'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}>
              Detalii produs
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`border-b-2 px-1 py-4 font-medium ${
                activeTab === 'reviews' ?
                  'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}>
              Recenzii ({MOCK_RATING})
            </button>
          </nav>
        </div>

        {/* Tab content */}
        {activeTab === 'details' && (
          <div className='py-6'>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div className='rounded bg-gray-50 p-4'>
                <span className='text-gray-500'>Categorie:</span>
                <span className='float-right font-medium'>
                  {product.productType.name}
                </span>
              </div>
              <div className='rounded bg-gray-50 p-4'>
                <span className='text-gray-500'>Fermă:</span>
                <span className='float-right font-medium'>
                  {product.shop!.name}
                </span>
              </div>
              <div className='rounded bg-gray-50 p-4'>
                <span className='text-gray-500'>Locatie:</span>
                <span className='float-right font-medium'>
                  {product.city}, {product.county}
                </span>
              </div>
              <div className='rounded bg-gray-50 p-4'>
                <span className='text-gray-500'>Ora de ridicare</span>
                <span className='float-right font-medium'>ORA</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && <ReviewsSection product={product} />}
      </div>

      <div className='mt-10 border-t border-gray-200 pt-6'>
        <h3 className='mb-4 text-lg font-semibold'>
          Despre {product.shop!.name}
        </h3>
        <p className='mb-4 text-gray-700'>{product.shop!.description}</p>
        <Link to='/' className='text-primary hover:underline'>
          Află mai multe despre NUME FARM
        </Link>
      </div>

      {/* Farm location map */}
      <div className='mt-10'>
        <h3 className='mb-4 text-lg font-semibold'>Locația fermei</h3>
        <div className='relative'>
          <FarmLocationMap lat={product.latitude} lng={product.longitude} />
        </div>
      </div>
    </div>
  );
}
