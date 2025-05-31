import { createFileRoute } from '@tanstack/react-router';
import { mockProducts } from '../data/mockData';
import ProductsList from '../components/ProductList';
import type { Product } from '../types';

export const Route = createFileRoute('/category/&categoryid')({
  loader: ({ params }) => {
    const { categoryid } = params;
    const products = mockProducts.filter(p => p.category === categoryid);
    return { categoryid, products };
  },
  component: CategoryPage,
});
// Define the expected loader data type
type CategoryLoaderData = {
  categoryid: string;
  products: Product[];
};

function CategoryPage() {
  // Use proper type assertion
  const { categoryid, products } = Route.useLoaderData() as CategoryLoaderData;
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Produse din categoria: {formatCategoryName(categoryid)}
      </h1>
      <ProductsList 
        products={products}
        onProductHover={() => {}} 
      />
    </div>
  );
}

// Format category name
function formatCategoryName(category: string): string {
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
}