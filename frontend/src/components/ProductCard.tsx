import { Product } from '@/lib/http/models/products';
import { Link } from '@tanstack/react-router';
import React from 'react';

interface ProductCardProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  product: Product;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <div
      className='cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg'
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      <Link to={`/products/$productId`} params={{ productId: product['id'] }}>
        <div className='relative'>
          <img
            src={product['imageUrl']}
            alt={product.title}
            className='h-48 w-full object-cover'
          />
        </div>
      </Link>

      <div className='p-4'>
        <div className='mb-2 flex items-start justify-between'>
          <Link
            to={`/products/$productId`}
            params={{ productId: product['id'] }}>
            <h3 className='hover:text-primary text-lg font-semibold'>
              {product['title']}
            </h3>
          </Link>
          <div className='flex items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-4 w-4 text-yellow-500'
              viewBox='0 0 20 20'
              fill='currentColor'>
              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
            </svg>
            <span className='ml-1 text-sm font-medium'>5 (2)</span>
          </div>
        </div>

        <div className='mb-2 flex items-center gap-1'>
          <span className='text-sm text-gray-600'>
            {product.productType.name}
          </span>
          <span className='text-xs text-gray-400'>•</span>
          <span className='text-sm text-gray-500'>
            {product.productType.category}
          </span>
        </div>
        <p className='mb-3 line-clamp-2 text-sm text-gray-500'>
          {product['description']}
        </p>

        <div className='flex items-center justify-between'>
          <span className='text-lg font-bold'>
            {product['price'].toFixed(2)} lei
          </span>
          <button className='bg-primary hover:bg-primary-dark rounded px-3 py-1 text-white transition'>
            Adaugă în coș
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
