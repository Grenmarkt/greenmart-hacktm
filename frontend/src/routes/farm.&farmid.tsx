import React, { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { Product } from '../types';
import { mockProducts } from '../data/mockData';

// Define the route with loader
export const Route = createFileRoute('/farm/&farmid')({

  loader: ({ params }) => {
    const { farmid } = params;
    
    // Convertim slug-ul înapoi în numele fermei
    const farmName = farmid.split('-').map((word: string) => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    
    // Găsim produsele fermei
    const farmProducts = mockProducts.filter(product => 
      product.farmName.toLowerCase().replace(/\s+/g, '-') === farmid
    );
    
    if (farmProducts.length === 0) {
      throw new Error(`Farm with slug ${farmid} not found`);
    }

    const firstProduct = farmProducts[0];
    const averageRating = farmProducts.reduce((sum, product) => sum + product.rating, 0) / farmProducts.length;
    const totalReviews = farmProducts.reduce((sum, product) => sum + product.reviewCount, 0);
    
    // Categoriile de produse ale fermei
    const categories = [...new Set(farmProducts.map(product => product.category))];
    
    return {
      farmName,
      farmProducts,
      firstProduct,
      averageRating,
      totalReviews,
      categories
    };
  },
  component: FarmDetailPage,
});

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

// Componenta pentru afișarea ratingului sub formă de stele
const StarRating: React.FC<{ rating: number; reviewCount: number }> = ({ rating, reviewCount }) => {
  return (
    <div className="flex items-center">
      <div className="flex text-yellow-400 mr-2">
        {[1, 2, 3, 4, 5].map(star => (
          <svg 
            key={star}
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 ${rating >= star ? 'fill-current' : 'text-gray-300'}`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-sm text-gray-600">{rating.toFixed(1)} ({reviewCount} recenzii)</span>
    </div>
  );
};

// Mock data pentru informații despre fermă
const farmInfo = {
  establishedYear: 2018,
  totalArea: '25 hectare',
  certifications: ['Bio', 'Fair Trade', 'Organic EU'],
  specialties: ['Cultivare ecologică', 'Produse sezoniere', 'Vânzare directă'],
  story: 'Ferma noastră a fost înființată din pasiunea pentru agricultura sustenabilă și dorința de a oferi comunității locale produse proaspete și sănătoase. Prin metode de cultivare ecologică și respectul pentru natură, ne străduim să menținem calitatea superioară a produselor noastre.',
  mission: 'Să promovăm agricultura sustenabilă și să oferim produse locale de cea mai înaltă calitate, respectând în același timp mediul înconjurător și tradițiile agricole.'
};

// Componenta pentru harta fermei
const FarmMap: React.FC<{ location: { lat: number; lng: number } }> = ({ location }) => {
  const mapContainer = React.useRef<HTMLDivElement>(null);
  const map = React.useRef<mapboxgl.Map | null>(null);

  React.useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoidGFnZXN0dWRpbyIsImEiOiJjbTlrM3o5eXUwaWVjMmtzZ3ltcDAwazR6In0.tLphe6RSpLB4jbjdYuBg4g';

    if (!map.current && mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/satellite-streets-v11',
        center: [location.lng, location.lat],
        zoom: 14
      });

      // Adaugă un marker pentru locația fermei
      new mapboxgl.Marker({ color: '#4CAF50' })
        .setLngLat([location.lng, location.lat])
        .addTo(map.current);
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [location]);

  return (
    <div className="rounded-lg overflow-hidden shadow-lg">
      <div ref={mapContainer} className="h-96 w-full" />
    </div>
  );
};

// Mock reviews pentru fermă
const farmReviews = [
  {
    id: 1,
    name: 'Elena Popescu',
    rating: 5,
    date: '1 săptămână în urmă',
    comment: 'O fermă excepțională! Produsele sunt întotdeauna proaspete și de calitate superioară. Familia care conduce ferma este foarte prietenoasă și pasionată de ceea ce face.',
    productsPurchased: ['Roșii', 'Castraveți', 'Salată']
  },
  {
    id: 2,
    name: 'Mihai Ionescu',
    rating: 5,
    date: '2 săptămâni în urmă',
    comment: 'Am descoperit această fermă prin recomandări și nu regret! Metoda de cultivare ecologică se simte în gustul produselor. Recomand cu încredere!',
    productsPurchased: ['Mere', 'Pere', 'Miere']
  },
  {
    id: 3,
    name: 'Ana Gheorghiu',
    rating: 4,
    date: '3 săptămâni în urmă',
    comment: 'Produse de calitate și fermieri dedicați. Prețurile sunt corecte pentru calitatea oferită. Voi reveni cu siguranță.',
    productsPurchased: ['Brânză de vaci', 'Ouă']
  }
];

// Define the expected type for loader data
type FarmLoaderData = {
  farmName: string;
  farmProducts: Product[];
  firstProduct: Product;
  averageRating: number;
  totalReviews: number;
  categories: string[];
};

// Componenta principală pentru pagina fermei
function FarmDetailPage() {
  const [activeTab, setActiveTab] = useState('about');
  
  // Get data from the loader with proper typing
  const { farmName, farmProducts, firstProduct, averageRating, totalReviews, categories } = 
    Route.useLoaderData() as FarmLoaderData;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb navigation */}
      <nav className="mb-6">
        <ol className="flex text-sm text-gray-500">
          <li className="breadcrumb-item">
            <Link to="/" className="hover:text-primary">Acasă</Link>
            <span className="mx-2">/</span>
          </li>
          <li className="breadcrumb-item">
            <Link to="/search" className="hover:text-primary">Ferme</Link>
            <span className="mx-2">/</span>
          </li>
          <li className="breadcrumb-item text-gray-700 font-medium">{firstProduct.farmName}</li>
        </ol>
      </nav>

      {/* Farm header */}
      <div className="mb-10">
        <div className="relative h-64 bg-gradient-to-r from-green-600 to-green-800 rounded-lg overflow-hidden mb-6">
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="relative h-full flex items-center justify-center text-white">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-2">{firstProduct.farmName}</h1>
              <p className="text-lg">Fermă bio din județul Timiș</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="flex flex-wrap items-center justify-between mb-6">
              <div>
                <StarRating rating={averageRating} reviewCount={totalReviews} />
                <p className="text-gray-600 mt-2">
                  Înființată în {farmInfo.establishedYear} • {farmInfo.totalArea}
                </p>
              </div>
              <div className="flex space-x-2 mt-4 lg:mt-0">
                {farmInfo.certifications.map(cert => (
                  <span key={cert} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    {cert}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-2 text-green-800">Specializări</h3>
              <div className="flex flex-wrap gap-2">
                {farmInfo.specialties.map(specialty => (
                  <span key={specialty} className="bg-white text-green-700 px-3 py-1 rounded text-sm border border-green-200">
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-4">Contact rapid</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-sm">0740 123 456</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm">{firstProduct.farmName.toLowerCase().replace(/\s+/g, '')}@ferma.ro</span>
              </div>
            </div>
            <button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm">
              Contactează ferma
            </button>
          </div>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          <button 
            onClick={() => setActiveTab('about')}
            className={`py-4 px-1 border-b-2 font-medium ${
              activeTab === 'about' 
                ? 'border-green-600 text-green-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Despre noi
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`py-4 px-1 border-b-2 font-medium ${
              activeTab === 'products' 
                ? 'border-green-600 text-green-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Produse ({farmProducts.length})
          </button>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`py-4 px-1 border-b-2 font-medium ${
              activeTab === 'reviews' 
                ? 'border-green-600 text-green-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Recenzii ({totalReviews})
          </button>
          <button 
            onClick={() => setActiveTab('location')}
            className={`py-4 px-1 border-b-2 font-medium ${
              activeTab === 'location' 
                ? 'border-green-600 text-green-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Locația & Program
          </button>
        </nav>
      </div>

      {/* Tab content */}
      {activeTab === 'about' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-bold mb-6">Povestea noastră</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">{farmInfo.story}</p>
            
            <h3 className="text-xl font-semibold mb-4">Misiunea noastră</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">{farmInfo.mission}</p>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-4">Categorii de produse</h3>
              <div className="grid grid-cols-2 gap-4">
                {categories.map((category: string) => (
                  <div key={category} className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <span>{formatCategoryName(category)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="font-semibold text-lg mb-4 text-green-800">Certificări și standarde</h3>
              <div className="space-y-3">
                {farmInfo.certifications.map(cert => (
                  <div key={cert} className="flex items-center">
                    <svg className="w-5 h-5 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-4 text-blue-800">Statistici ferma</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{farmProducts.length}</div>
                  <div className="text-sm text-gray-600">Produse active</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{farmInfo.establishedYear}</div>
                  <div className="text-sm text-gray-600">An înființare</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{averageRating.toFixed(1)}</div>
                  <div className="text-sm text-gray-600">Rating mediu</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{totalReviews}</div>
                  <div className="text-sm text-gray-600">Total recenzii</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'products' && (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Produsele noastre</h2>
            <p className="text-gray-600">Descoperă gama completă de produse locale și bio ale fermei noastre</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {farmProducts.map((product: Product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
              >
                <Link to="/product/$productid" params={{ productid: product.id.toString() }}>
                  <div className="h-48 overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition duration-300"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <Link to="/product/$productid" params={{ productid: product.id.toString() }}>
                    <h3 className="font-medium text-gray-800 hover:text-green-600">{product.name}</h3>
                  </Link>
                  <p className="text-sm text-gray-600 mb-2">{formatCategoryName(product.category)}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-green-600">{product.price.toFixed(2)} lei</span>
                    <StarRating rating={product.rating} reviewCount={product.reviewCount} />
                  </div>
                  <button className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded text-sm">
                    Adaugă în coș
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Recenzii clienți</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold mb-2">{averageRating.toFixed(1)}</div>
                  <StarRating rating={averageRating} reviewCount={totalReviews} />
                </div>
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg">
                  Scrie o recenzie
                </button>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            {farmReviews.map(review => (
              <div key={review.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-green-600 font-semibold">
                        {review.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium">{review.name}</h4>
                      <div className="flex items-center text-sm text-gray-500">
                        <StarRating rating={review.rating} reviewCount={0} />
                        <span className="ml-2">{review.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{review.comment}</p>
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-600 mb-2">Produse achiziționate:</p>
                  <div className="flex flex-wrap gap-2">
                    {review.productsPurchased.map(product => (
                      <span key={product} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                        {product}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'location' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-bold mb-6">Locația fermei</h2>
            <FarmMap location={firstProduct.location} />
            
            <div className="mt-6 bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-4">Adresa completă</h3>
              <p className="text-gray-700">
                Str. Principală nr. {Math.floor(Math.random() * 100) + 1}<br />
                {firstProduct.farmName} Farm<br />
                Județ Timiș, România
              </p>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-6">Program de lucru</h2>
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Luni - Vineri</span>
                  <span className="text-green-600">08:00 - 18:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Sâmbătă</span>
                  <span className="text-green-600">08:00 - 15:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Duminică</span>
                  <span className="text-green-600">09:00 - 13:00</span>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-4 text-green-800">Informații importante</h3>
              <ul className="space-y-2 text-sm text-green-700">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Vă recomandăm să sunați înainte de vizită
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Parcare gratuită disponibilă
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Acceptăm plata cash și cu cardul
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Tur ghidat al fermei disponibil la cerere
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FarmDetailPage;