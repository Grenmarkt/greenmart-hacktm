import ProductCard from './ProductCard';

interface ProductsListProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  products: Record<string, any>[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onProductHover: (product: Record<string, any> | null) => void;
}

function ProductsList({ products, onProductHover }: ProductsListProps) {
  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
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
