import React, { useState } from 'react';

// Mock data pentru demonstrație
const mockProducts = [
  {
    id: 1,
    name: "Mere roșii",
    price: 4.50,
    category: "fructe",
    imageUrl: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=200&fit=crop"
  },
  {
    id: 2,
    name: "Pere Williams",
    price: 6.20,
    category: "fructe",
    imageUrl: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=300&h=200&fit=crop"
  },
  {
    id: 3,
    name: "Prune",
    price: 8.00,
    category: "fructe",
    imageUrl: "https://images.unsplash.com/photo-1471196831526-a2c5187b7b84?w=300&h=200&fit=crop"
  },
  {
    id: 4,
    name: "Căpșuni",
    price: 12.00,
    category: "fructe",
    imageUrl: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=300&h=200&fit=crop"
  },
  {
    id: 5,
    name: "Cireșe",
    price: 15.50,
    category: "fructe",
    imageUrl: "https://images.unsplash.com/photo-1528821128474-27f963b062bf?w=300&h=200&fit=crop"
  },
  {
    id: 6,
    name: "Piersici",
    price: 7.80,
    category: "fructe",
    imageUrl: "https://images.unsplash.com/photo-1629828141025-77d58c4c8c44?w=300&h=200&fit=crop"
  }
];

const categories = [
  { id: 'fructe', name: 'Fructe', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=150&h=150&fit=crop' },
  { id: 'legume', name: 'Legume', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=150&h=150&fit=crop' },
  { id: 'lactate', name: 'Lactate', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=150&h=150&fit=crop' },
  { id: 'cereale', name: 'Cereale', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=150&h=150&fit=crop' },
  { id: 'carne', name: 'Carne', image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=150&h=150&fit=crop' },
  { id: 'miere_si_gemuri', name: 'Miere și gemuri', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=150&h=150&fit=crop' },
  { id: 'muraturi', name: 'Murături', image: 'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=150&h=150&fit=crop' },
  { id: 'sucuri_si_bauturi_alcoolice', name: 'Sucuri și băuturi', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=150&h=150&fit=crop' }
];

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('Timișoara');

  const fruitProducts = mockProducts.filter(product => product.category === 'fructe');

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section cu imagine de fundal îmbunătățită */}
      <div className="relative h-96 overflow-hidden">
        {/* Fundal gradient cu pattern */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(135deg, #667eea 0%, #764ba2 100%),
              radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)
            `,
            backgroundBlendMode: 'overlay'
          }}
        />
        
        {/* Pattern decorativ */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(120, 200, 119, 0.3) 0%, transparent 50%)
            `
          }}
        />
        
        {/* Overlay subtil */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>
        
        <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
          <div className="w-full max-w-5xl">
            {/* Titlu elegant */}
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                Grenmarkt
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-light">
                Alimente proaspete direct de la fermieri
              </p>
            </div>
            
            {/* Search bar îmbunătățit */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/20">
              <div className="flex flex-col md:flex-row">
                <div className="flex-grow p-6">
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Aș dori să cumpăr produse proaspete..."
                      className="w-full outline-none text-lg placeholder-gray-400"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="md:border-l border-gray-200">
                  <div className="p-6 flex items-center">
                    <svg className="w-6 h-6 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <select
                      className="outline-none bg-transparent text-lg"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    >
                      <option>Timișoara</option>
                      <option>București</option>
                      <option>Cluj-Napoca</option>
                      <option>Iași</option>
                      <option>Brașov</option>
                    </select>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all duration-300">
                  <button className="text-white font-semibold w-full h-full px-8 py-6 text-lg">
                    Căutare
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white via-white/50 to-transparent"></div>
      </div>

      {/* Categorii */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Categorii principale</h2>
          <p className="text-gray-600 text-lg">Descoperă varietatea de produse proaspete</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {categories.map(category => (
            <div
              key={category.id}
              className="flex flex-col items-center group cursor-pointer transform hover:scale-105 transition-all duration-300"
            >
              <div className="w-20 h-20 rounded-full overflow-hidden mb-3 shadow-lg group-hover:shadow-xl transition-shadow">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className="text-center text-sm font-medium text-gray-700 group-hover:text-gray-900">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Produse Fructe */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Fructe proaspete</h2>
            <p className="text-gray-600 text-lg">Direct de la producători locali</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {fruitProducts.map(product => (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-48 object-cover hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-lg mb-2 text-gray-800">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Arieș, Livada Cozai cu fructe<br />
                    <span className="text-green-600 font-medium">Disponibilitate: 80kg</span>
                  </p>
                  <p className="font-bold text-xl mb-4 text-gray-900">
                    {product.price.toFixed(2)} <span className="text-sm font-normal">lei/kg</span>
                  </p>
                  <button className="flex items-center justify-center w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Adaugă în coș
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Verde */}
      <footer className="bg-gradient-to-br from-green-700 to-green-800 text-white py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4 text-green-100">Grenmarkt</h3>
              <p className="text-green-200 text-lg leading-relaxed">
                Platforma Grenmarkt conectează fermierii locali cu consumatorii,
                aducând alimente proaspete direct de la sursă la masa ta. 
                Susținem agricultura locală și consumul responsabil.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-100">Link-uri rapide</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-green-200 hover:text-white transition-colors duration-300 flex items-center">
                  <span className="mr-2">🏠</span> Acasă
                </a></li>
                <li><a href="#" className="text-green-200 hover:text-white transition-colors duration-300 flex items-center">
                  <span className="mr-2">ℹ️</span> Despre noi
                </a></li>
                <li><a href="#" className="text-green-200 hover:text-white transition-colors duration-300 flex items-center">
                  <span className="mr-2">🌾</span> Producători
                </a></li>
                <li><a href="#" className="text-green-200 hover:text-white transition-colors duration-300 flex items-center">
                  <span className="mr-2">📞</span> Contact
                </a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-100">Contact</h3>
              <div className="space-y-3">
                <p className="text-green-200 flex items-center">
                  <span className="mr-2">📧</span> contact@grenmarkt.ro
                </p>
                <p className="text-green-200 flex items-center">
                  <span className="mr-2">📱</span> 0745 123 456
                </p>
                <p className="text-green-200 flex items-center">
                  <span className="mr-2">📍</span> Timișoara, România
                </p>
              </div>
              <div className="mt-6 flex space-x-4">
                <a href="#" className="w-10 h-10 bg-green-600 hover:bg-green-500 rounded-full flex items-center justify-center transition-colors duration-300">
                  <span className="text-white">f</span>
                </a>
                <a href="#" className="w-10 h-10 bg-green-600 hover:bg-green-500 rounded-full flex items-center justify-center transition-colors duration-300">
                  <span className="text-white">📷</span>
                </a>
                <a href="#" className="w-10 h-10 bg-green-600 hover:bg-green-500 rounded-full flex items-center justify-center transition-colors duration-300">
                  <span className="text-white">🐦</span>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-green-600 pt-6 text-center">
            <p className="text-green-300">
              © 2024 Grenmarkt. Toate drepturile rezervate. | 
              <a href="#" className="hover:text-white ml-2 transition-colors duration-300">Politica de confidențialitate</a> | 
              <a href="#" className="hover:text-white ml-2 transition-colors duration-300">Termeni și condiții</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;