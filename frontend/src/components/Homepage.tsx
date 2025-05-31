import React, { useState } from 'react';
import { Search, ShoppingCart, MapPin, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import heroImage from '../assets/hero-image.jpg'; 
interface Product {
  id: number;
  name: string;
  brand: string;
  weight: string;
  price: string;
  image: string;
}

interface Category {
  id: number;
  name: string;
  image: string;
}

const Homepage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const categories: Category[] = [
    { id: 1, name: 'Fructe', image: '🍎' },
    { id: 2, name: 'Legume', image: '🥕' },
    { id: 3, name: 'Lactate', image: '🥛' },
    { id: 4, name: 'Cereale', image: '🌾' },
    { id: 5, name: 'Carne', image: '🥩' },
    { id: 6, name: 'Miere și gemuri', image: '🍯' },
    { id: 7, name: 'Murături', image: '🥒' },
    { id: 8, name: 'Sucuri și băuturi alcoolice', image: '🍷' }
  ];

  const products: Product[] = [
    {
      id: 1,
      name: 'Mere netratate din livada proprie',
      brand: 'Andrei',
      weight: 'Disponibilitate: 650kg',
      price: '2.5lei/kg',
      image: '🍎'
    },
    {
      id: 2,
      name: 'Mere netratate din livada proprie',
      brand: 'Maria',
      weight: 'Disponibilitate: 550kg',
      price: '2.5lei/kg',
      image: '🍎'
    },
    {
      id: 3,
      name: 'Mere netratate din livada proprie',
      brand: 'Andrei',
      weight: 'Disponibilitate: 650kg',
      price: '2.5lei/kg',
      image: '🍎'
    },
    {
      id: 4,
      name: 'Mere netratate din livada proprie',
      brand: 'Andrei',
      weight: 'Disponibilitate: 650kg',
      price: '2.5lei/kg',
      image: '🍎'
    },
    {
      id: 5,
      name: 'Mere netratate din livada proprie',
      brand: 'Andrei',
      weight: 'Disponibilitate: 650kg',
      price: '2.5lei/kg',
      image: '🍎'
    },
    {
      id: 6,
      name: 'Mere netratate din livada proprie',
      brand: 'Andrei',
      weight: 'Disponibilitate: 650kg',
      price: '2.5lei/kg',
      image: '🍎'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
     
<section
  className="py-16 bg-cover bg-center"
style={{
  backgroundImage: `url(${heroImage})`,
}}
>
  <div className="container mx-auto px-4">
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Ai dori să cumperi ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 w-full border-0 focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <ShoppingCart className="w-5 h-5" />
            <span>Legume</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-5 h-5" />
            <span>Timișoara</span>
          </div>
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8">
            Caută
          </Button>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Categories Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Categorii principale</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 lg:gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex flex-col items-center cursor-pointer group"
              >
                <div className="w-20 h-20 lg:w-28 lg:h-28 bg-white rounded-full shadow-lg flex items-center justify-center group-hover:shadow-xl transition-shadow duration-300 mb-3">
                  <span className="text-3xl lg:text-4xl">{category.image}</span>
                </div>
                <span className="text-xs lg:text-sm font-medium text-center text-gray-700 group-hover:text-green-600 transition-colors">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Products Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Fructe</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="aspect-square bg-gradient-to-br from-red-100 to-yellow-100 flex items-center justify-center">
                  <span className="text-4xl lg:text-6xl">{product.image}</span>
                </div>
                <div className="p-3 lg:p-4">
                  <h3 className="font-semibold text-gray-800 mb-2 text-sm lg:text-base">{product.name}</h3>
                  <p className="text-xs lg:text-sm text-gray-600 mb-1">{product.brand}, Livada rosii cu fructe</p>
                  <p className="text-xs lg:text-sm text-gray-600 mb-1">{product.weight}</p>
                  <p className="text-xs lg:text-sm font-medium text-gray-800 mb-3">Preț: {product.price}</p>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white text-xs lg:text-sm">
                    <Plus className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
                    Adaugă în coș
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Homepage;