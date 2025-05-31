import React from 'react';
import ProductCard from './ProductCard';
import type { Product } from '../types';

interface ProductsListProps {
  products: Product[];
  onProductHover: (product: Product | null) => void;
}

function ProductsList({ products, onProductHover }: ProductsListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onMouseEnter={() => onProductHover(product)}
          onMouseLeave={() => onProductHover(null)}
        />
      ))}
    </div>
  );
}

export default ProductsList;