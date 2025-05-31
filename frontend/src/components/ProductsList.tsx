import { Product } from '@/lib/http/models/products';
import ProductCard from './ProductCard';

interface ProductsListProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  products: Product[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onProductHover: (product: Record<string, any> | null) => void;
}

function ProductsList({ products, onProductHover }: ProductsListProps) {
  return (
    <div className='grid w-full grid-cols-1 gap-10 p-4 md:grid-cols-2'>
      {products.map((product) => (
        <ProductCard
          key={product['id']}
          product={product}
          onMouseEnter={() => onProductHover(product)}
          onMouseLeave={() => onProductHover(null)}
        />
      ))}
    </div>
  );
}

export default ProductsList;
