export default function ProductPhoto({
  image,
  productName,
}: {
  image: string | undefined;
  productName: string | undefined;
}) {
  return (
    <div className='mb-4 h-96 w-full overflow-hidden rounded-lg bg-gray-100'>
      <img
        src={image}
        alt={`Poza cu ${productName}`}
        className='h-full w-full object-cover'
      />
      ;
    </div>
  );
}
