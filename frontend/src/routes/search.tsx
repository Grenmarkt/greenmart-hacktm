import React, { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import ProductsList from '../components/ProductList';
import Map from '../components/Map';
import type { Product, Category } from '../types';
import { mockProducts } from '../data/mockData';

export const Route = createFileRoute('/search')({
  component: SearchPage,
});

function SearchPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('Toate');
  const [products] = useState<Product[]>(mockProducts);
  const [hoveredProduct, setHoveredProduct] = useState<Product | null>(null);

  const filteredProducts = selectedCategory === 'Toate'
    ? products
    : products.filter(product => product.category === selectedCategory);

  const categories: Category[] = [
    'Toate', 'fructe', 'legume', 'lactate', 'cereale',
    'carne', 'miere_si_gemuri', 'muraturi', 'sucuri_si_bauturi_alcoolice'
  ];

  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="w-3/4 overflow-y-auto p-6">
        <div className="mb-6">
          <div className="flex gap-2 overflow-x-auto pb-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-green-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-800'
                }`}
              >
                {category === 'miere_si_gemuri'
                  ? 'Miere și Gemuri'
                  : category === 'sucuri_si_bauturi_alcoolice'
                  ? 'Sucuri și Băuturi Alcoolice'
                  : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
          <p className="text-gray-600">
            Afișăm <span className="font-medium">{filteredProducts.length}</span> produse
          </p>
        </div>

        <ProductsList
          products={filteredProducts}
          onProductHover={setHoveredProduct}
        />
      </div>

      <div className="w-1/3 relative">
        <Map
          products={filteredProducts}
          hoveredProduct={hoveredProduct}
        />
      </div>
    </div>
  );
}