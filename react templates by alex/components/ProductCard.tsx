import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';

// Funcție pentru formatarea numelor categoriilor pentru afișare
const formatCategoryName = (category: string): string => {
  switch (category) {
    case 'fructe': return 'Fructe';
    case 'legume': return 'Legume';
    case 'lactate': return 'Lactate';
    case 'cereale': return 'Cereale';
    case 'carne': return 'Carne';
    case 'miere_si_gemuri': return 'Miere și Gemuri';
    case 'muraturi': return 'Murături';
    case 'sucuri_si_bauturi_alcoolice': return 'Sucuri și Băuturi Alcoolice';
    default: return category;
  }
};

interface ProductCardProps {
  product: Product;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onMouseEnter, onMouseLeave }) => {
  return (
    <div 
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Link to={`/product/${product.id}`}>
        <div className="relative">
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <button className="absolute top-3 right-3 p-2 rounded-full bg-white bg-opacity-60 hover:bg-opacity-100 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </Link>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/product/${product.id}`}>
            <h3 className="font-semibold text-lg hover:text-primary">{product.name}</h3>
          </Link>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1 text-sm font-medium">{product.rating} ({product.reviewCount})</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1 mb-2">
          <span className="text-sm text-gray-600">{product.farmName}</span>
          <span className="text-xs text-gray-400">•</span>
          <span className="text-sm text-gray-500">{formatCategoryName(product.category)}</span>
        </div>
        <p className="text-sm text-gray-500 line-clamp-2 mb-3">{product.description}</p>
        
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg">{product.price.toFixed(2)} lei</span>
          <button className="px-3 py-1 bg-primary text-white rounded hover:bg-primary-dark transition">
            Adaugă în coș
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;