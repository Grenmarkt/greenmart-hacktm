import { createFileRoute } from '@tanstack/react-router';
import { mockProducts } from '../data/mockData';
import type { Product } from '../types';

// Note: The route parameter must match the filename parameter
export const Route = createFileRoute('/product/$productid')({
  loader: ({ params }) => {
    const { productid } = params;
    // Find the product by ID
    const product = mockProducts.find(p => p.id.toString() === productid);
    
    if (!product) {
      throw new Error(`Product with ID ${productid} not found`);
    }
    
    return product;
  },
  component: ProductDetailPage,
});

function ProductDetailPage() {
  // Get the product data from the loader
  const product = Route.useLoaderData();
  
  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-96 object-cover"
            />
          </div>
          <div className="md:w-1/2 p-8">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <div className="flex items-center mb-4">
              <span className="font-bold text-2xl mr-2">{product.price.toFixed(2)} lei</span>
              {/* Remove reference to product.unit since it doesn't exist in your interface */}
              <span className="text-sm text-gray-500">/ bucată</span>
            </div>
            <p className="text-gray-700 mb-6">{product.description}</p>
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Detalii:</h3>
              <div className="flex flex-col gap-2">
                <p><span className="text-gray-600">Fermă:</span> {product.farmName}</p>
                {/* Fix the location properties that don't exist in your interface */}
                <p><span className="text-gray-600">Locație:</span> Coordonate: {product.location.lat.toFixed(6)}, {product.location.lng.toFixed(6)}</p>
                <p><span className="text-gray-600">Categorie:</span> {product.category}</p>
              </div>
            </div>
            <button className="bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary-dark transition w-full">
              Adaugă în coș
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}