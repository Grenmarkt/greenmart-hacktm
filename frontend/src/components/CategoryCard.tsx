import { Link } from '@tanstack/react-router';

interface CategoryCardProps {
  /** valoarea parametrului 'category' în URL */
  categoryValue: string;
  /** titlul afișat în card */
  title: string;
  /** sursa imaginii afișate */
  imageSrc: string;
  /** opțional: pagina țintă; default: "/products" */
  to?: string;
}

export function CategoryCard({
  categoryValue,
  title,
  imageSrc,
  to = '/products',
}: CategoryCardProps) {
  return (
    <Link
      to={to}
      search={{ category: categoryValue }}
      className='flex flex-col items-center gap-3 transition-all duration-300 hover:scale-105'>
      <img
        src={imageSrc}
        alt={title}
        className='h-40 w-40 rounded-full object-cover'
      />
      <span className='text-lg font-semibold'>{title}</span>
    </Link>
  );
}
