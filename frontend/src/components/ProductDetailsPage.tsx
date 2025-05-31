// import React, { useState } from 'react';

// function ProductGallery({ image }: { image: string }) {
//   return (
//     <div className='mb-6'>
//       <div className='mb-4 h-96 w-full overflow-hidden rounded-lg bg-gray-100'>
//         <img src={image} alt='Produs' className='h-full w-full object-cover' />
//       </div>
//     </div>
//   );
// }

// // const FarmLocationMap: React.FC<{ location: { lat: number; lng: number } }> = ({
// //   location,
// // }) => {
// //   const mapContainer = React.useRef<HTMLDivElement>(null);
// //   const map = React.useRef<mapboxgl.Map | null>(null);

// //   React.useEffect(() => {
// //     mapboxgl.accessToken =
// //       'pk.eyJ1IjoidGFnZXN0dWRpbyIsImEiOiJjbTlrM3o5eXUwaWVjMmtzZ3ltcDAwazR6In0.tLphe6RSpLB4jbjdYuBg4g';

// //     if (!map.current && mapContainer.current) {
// //       map.current = new mapboxgl.Map({
// //         container: mapContainer.current,
// //         style: 'mapbox://styles/mapbox/streets-v11',
// //         center: [location.lng, location.lat],
// //         zoom: 12,
// //       });

// //       // Adaugă un marker pentru locația fermei
// //       new mapboxgl.Marker({ color: '#4CAF50' })
// //         .setLngLat([location.lng, location.lat])
// //         .addTo(map.current);
// //     }

// //     return () => {
// //       if (map.current) {
// //         map.current.remove();
// //         map.current = null;
// //       }
// //     };
// //   }, [location]);

// //   return (
// //     <div className='h-64 overflow-hidden rounded-lg shadow-md'>
// //       <div ref={mapContainer} className='h-full w-full' />
// //     </div>
// //   );
// // };

// // Componenta pentru afișarea ratingului sub formă de stele
// const StarRating: React.FC<{ rating: number; reviewCount: number }> = ({
//   rating,
//   reviewCount,
// }) => {
//   return (
//     <div className='flex items-center'>
//       <div className='mr-2 flex text-yellow-400'>
//         {[1, 2, 3, 4, 5].map((star) => (
//           <svg
//             key={star}
//             xmlns='http://www.w3.org/2000/svg'
//             className={`h-5 w-5 ${rating >= star ? 'fill-current' : 'text-gray-300'}`}
//             viewBox='0 0 20 20'>
//             <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
//           </svg>
//         ))}
//       </div>
//       <span className='text-sm text-gray-600'>
//         {rating.toFixed(1)} ({reviewCount} recenzii)
//       </span>
//     </div>
//   );
// };

// // Mock data pentru recenzii
// const mockReviews = [
//   {
//     id: 1,
//     name: 'Maria Popescu',
//     rating: 5,
//     date: '2 săptămâni în urmă',
//     comment:
//       'Produse excepționale! Calitate superioară și gustul este fantastic. Voi comanda din nou cu siguranță.',
//     verified: true,
//   },
//   {
//     id: 2,
//     name: 'Ion Dumitrescu',
//     rating: 4,
//     date: '3 săptămâni în urmă',
//     comment:
//       'Foarte mulțumit de calitate. Produsele sunt proaspete și livrarea a fost la timp.',
//     verified: true,
//   },
//   {
//     id: 3,
//     name: 'Ana Gheorghiu',
//     rating: 5,
//     date: '1 lună în urmă',
//     comment:
//       'Cea mai bună alegere pentru produse locale! Fermierul este foarte amabil și profesionist.',
//     verified: false,
//   },
// ];

// // Componenta pentru secțiunea de recenzii
// const ReviewsSection: React.FC<{ product: Product }> = ({ product }) => {
//   return (
//     <div className='py-6'>
//       <div className='mb-6'>
//         <div className='mb-4 flex items-center justify-between'>
//           <h3 className='text-xl font-semibold'>
//             Recenzii clienți ({product.reviewCount})
//           </h3>
//           <button className='rounded-lg bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700'>
//             Scrie o recenzie
//           </button>
//         </div>

//         {/* Rating summary */}
//         <div className='mb-6 rounded-lg bg-gray-50 p-6'>
//           <div className='flex items-center justify-between'>
//             <div>
//               <div className='mb-2 text-3xl font-bold'>{product.rating}</div>
//               <StarRating
//                 rating={product.rating}
//                 reviewCount={product.reviewCount}
//               />
//             </div>
//             <div className='text-right'>
//               <div className='mb-2 text-sm text-gray-600'>
//                 Distribuția ratingurilor:
//               </div>
//               {[5, 4, 3, 2, 1].map((stars) => (
//                 <div key={stars} className='flex items-center text-sm'>
//                   <span className='w-3'>{stars}</span>
//                   <svg
//                     className='mx-1 h-3 w-3 text-yellow-400'
//                     fill='currentColor'
//                     viewBox='0 0 20 20'>
//                     <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
//                   </svg>
//                   <div className='mx-2 h-2 w-16 rounded-full bg-gray-200'>
//                     <div
//                       className='h-2 rounded-full bg-yellow-400'
//                       style={{ width: `${Math.random() * 80 + 20}%` }}></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Individual reviews */}
//       <div className='space-y-6'>
//         {mockReviews.map((review) => (
//           <div key={review.id} className='border-b border-gray-200 pb-6'>
//             <div className='mb-2 flex items-start justify-between'>
//               <div className='flex items-center'>
//                 <div className='mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-100'>
//                   <span className='text-sm font-semibold text-green-600'>
//                     {review.name
//                       .split(' ')
//                       .map((n) => n[0])
//                       .join('')}
//                   </span>
//                 </div>
//                 <div>
//                   <div className='flex items-center'>
//                     <span className='mr-2 font-medium'>{review.name}</span>
//                     {review.verified && (
//                       <span className='rounded bg-green-100 px-2 py-1 text-xs text-green-700'>
//                         Cumpărător verificat
//                       </span>
//                     )}
//                   </div>
//                   <div className='flex items-center text-sm text-gray-500'>
//                     <StarRating rating={review.rating} reviewCount={0} />
//                     <span className='ml-2'>{review.date}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <p className='ml-13 text-gray-700'>{review.comment}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // Componenta pentru secțiunea de detalii de ridicare
// const PickupDetailsSection: React.FC<{ product: Product }> = ({ product }) => {
//   return (
//     <div className='py-6'>
//       <h3 className='mb-6 text-xl font-semibold'>Detalii de ridicare</h3>

//       <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
//         {/* Program de ridicare */}
//         <div className='rounded-lg bg-green-50 p-6'>
//           <h4 className='mb-4 text-lg font-semibold text-green-800'>
//             Program de ridicare
//           </h4>
//           <div className='space-y-3'>
//             <div className='flex justify-between'>
//               <span className='text-gray-700'>Luni - Vineri:</span>
//               <span className='font-medium'>08:00 - 18:00</span>
//             </div>
//             <div className='flex justify-between'>
//               <span className='text-gray-700'>Sâmbătă:</span>
//               <span className='font-medium'>08:00 - 15:00</span>
//             </div>
//             <div className='flex justify-between'>
//               <span className='text-gray-700'>Duminică:</span>
//               <span className='font-medium'>09:00 - 13:00</span>
//             </div>
//           </div>

//           <div className='mt-4 rounded border-l-4 border-green-500 bg-white p-4'>
//             <div className='flex'>
//               <svg
//                 className='mt-0.5 mr-2 h-5 w-5 text-green-500'
//                 fill='currentColor'
//                 viewBox='0 0 20 20'>
//                 <path
//                   fillRule='evenodd'
//                   d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
//                   clipRule='evenodd'
//                 />
//               </svg>
//               <div>
//                 <p className='text-sm font-medium text-green-800'>
//                   Recomandare
//                 </p>
//                 <p className='text-sm text-green-700'>
//                   Pentru a evita aglomerația, vă recomandăm să veniți între
//                   10:00-12:00 sau 14:00-16:00.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Informații de contact */}
//         <div>
//           <h4 className='mb-4 text-lg font-semibold'>Informații de contact</h4>
//           <div className='space-y-4'>
//             <div className='flex items-center'>
//               <svg
//                 className='mr-3 h-5 w-5 text-gray-400'
//                 fill='none'
//                 stroke='currentColor'
//                 viewBox='0 0 24 24'>
//                 <path
//                   strokeLinecap='round'
//                   strokeLinejoin='round'
//                   strokeWidth={2}
//                   d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
//                 />
//               </svg>
//               <div>
//                 <p className='font-medium'>Telefon fermă</p>
//                 <p className='text-sm text-gray-600'>0740 123 456</p>
//               </div>
//             </div>

//             <div className='flex items-center'>
//               <svg
//                 className='mr-3 h-5 w-5 text-gray-400'
//                 fill='none'
//                 stroke='currentColor'
//                 viewBox='0 0 24 24'>
//                 <path
//                   strokeLinecap='round'
//                   strokeLinejoin='round'
//                   strokeWidth={2}
//                   d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
//                 />
//               </svg>
//               <div>
//                 <p className='font-medium'>Email</p>
//                 <p className='text-sm text-gray-600'>
//                   {product.farmName.toLowerCase().replace(/\s+/g, '')}@ferma.ro
//                 </p>
//               </div>
//             </div>

//             <div className='flex items-start'>
//               <svg
//                 className='mt-1 mr-3 h-5 w-5 text-gray-400'
//                 fill='none'
//                 stroke='currentColor'
//                 viewBox='0 0 24 24'>
//                 <path
//                   strokeLinecap='round'
//                   strokeLinejoin='round'
//                   strokeWidth={2}
//                   d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
//                 />
//                 <path
//                   strokeLinecap='round'
//                   strokeLinejoin='round'
//                   strokeWidth={2}
//                   d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
//                 />
//               </svg>
//               <div>
//                 <p className='font-medium'>Adresa fermei</p>
//                 <p className='text-sm text-gray-600'>
//                   Str. Principală nr. {Math.floor(Math.random() * 100) + 1}
//                   <br />
//                   {product.farmName} Farm
//                   <br />
//                   Județ Timiș, România
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Instrucțiuni de ridicare */}
//       <div className='mt-8 rounded-lg bg-blue-50 p-6'>
//         <h4 className='mb-4 text-lg font-semibold text-blue-800'>
//           Instrucțiuni pentru ridicare
//         </h4>
//         <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
//           <div>
//             <h5 className='mb-2 font-medium'>Înainte de a veni:</h5>
//             <ul className='space-y-1 text-sm text-gray-700'>
//               <li>• Confirmați comanda cu 24h înainte</li>
//               <li>• Verificați programul de lucru</li>
//               <li>• Aduceți-vă propriile pungi/containere</li>
//               <li>• Pregătiți documentul de identitate</li>
//             </ul>
//           </div>
//           <div>
//             <h5 className='mb-2 font-medium'>La ferma:</h5>
//             <ul className='space-y-1 text-sm text-gray-700'>
//               <li>• Parcați în zona designată</li>
//               <li>• Anunțați-vă prezența</li>
//               <li>• Respectați măsurile de igienă</li>
//               <li>• Plata se poate face cash sau card</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export function ProductDetailPage() {

//   if (!product) {
//     return (
//       <div className='container mx-auto px-4 py-16 text-center'>
//         <h2 className='mb-4 text-2xl font-semibold'>
//           Produsul nu a fost găsit
//         </h2>
//         <Link to='/' className='text-primary hover:underline'>
//           Înapoi la pagina principală
//         </Link>
//       </div>
//     );
//   }

//   // Simulăm o galerie de imagini pentru produs
//   const productImages = [
//     product.imageUrl,
//     // Adăugăm imagini suplimentare pentru galerie
//     `https://images.unsplash.com/photo-${1550000000000 + product.id * 100}-c70d8ede${product.id}.jpg`,
//     `https://images.unsplash.com/photo-${1560000000000 + product.id * 100}-abd987${product.id}.jpg`,
//   ];

//   const handleIncreaseQuantity = () => setQuantity((prev) => prev + 1);
//   const handleDecreaseQuantity = () =>
//     setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
//   const handleAddToCart = () =>
//     alert(`S-au adăugat ${quantity} ${product.name} în coș`);

//   return (
//     <div className='container mx-auto px-4 py-8'>
//       {/* Breadcrumb navigation */}
//       <nav className='mb-6'>
//         <ol className='flex text-sm text-gray-500'>
//           <li className='breadcrumb-item'>
//             <Link to='/' className='hover:text-primary'>
//               Acasă
//             </Link>
//             <span className='mx-2'>/</span>
//           </li>
//           <li className='breadcrumb-item'>
//             <Link
//               to={`/category/${product.category}`}
//               className='hover:text-primary'>
//               {formatCategoryName(product.category)}
//             </Link>
//             <span className='mx-2'>/</span>
//           </li>
//           <li className='breadcrumb-item font-medium text-gray-700'>
//             {product.name}
//           </li>
//         </ol>
//       </nav>

//       {/* Product content - Grid layout */}
//       <div className='grid grid-cols-1 gap-10 md:grid-cols-2'>
//         {/* Left column - Product gallery */}
//         <div>
//           <ProductGallery images={productImages} />
//         </div>

//         {/* Right column - Product details */}
//         <div>
//           <h1 className='mb-2 text-3xl font-bold'>{product.name}</h1>
//           <p className='mb-4 text-gray-600'>
//             De la <span className='font-medium'>{product.farmName}</span>
//           </p>

//           <StarRating
//             rating={product.rating}
//             reviewCount={product.reviewCount}
//           />

//           <div className='my-6'>
//             <h2 className='text-primary text-2xl font-bold'>
//               {product.price.toFixed(2)} lei
//             </h2>
//             <p className='mt-1 text-sm text-gray-500'>Preț pe kilogram</p>
//           </div>

//           <p className='mb-6 text-gray-700'>{product.description}</p>

//           {/* Quantity selector */}
//           <div className='mb-6 flex items-center'>
//             <span className='mr-4 font-medium'>Cantitate:</span>
//             <div className='flex items-center'>
//               <button
//                 onClick={handleDecreaseQuantity}
//                 className='rounded-l border border-gray-300 px-3 py-2 hover:bg-gray-100'>
//                 -
//               </button>
//               <span className='border-t border-b border-gray-300 px-4 py-2'>
//                 {quantity}
//               </span>
//               <button
//                 onClick={handleIncreaseQuantity}
//                 className='rounded-r border border-gray-300 px-3 py-2 hover:bg-gray-100'>
//                 +
//               </button>
//             </div>
//           </div>

//           {/* Add to cart button */}
//           <button
//             onClick={handleAddToCart}
//             className='w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700'>
//             Adaugă în coș
//           </button>

//           {/* Farm information */}
//           <div className='mt-10 border-t border-gray-200 pt-6'>
//             <h3 className='mb-4 text-lg font-semibold'>
//               Despre {product.farmName}
//             </h3>
//             <p className='mb-4 text-gray-700'>
//               Afacere locală care produce{' '}
//               {formatCategoryName(product.category).toLowerCase()} de înaltă
//               calitate, cultivate cu grijă și atenție la mediul înconjurător.
//               Toate produsele sunt culese la maturitate optimă și livrate
//               proaspete.
//             </p>
//             <Link
//               to={`/farm/${product.farmName.toLowerCase().replace(/\s+/g, '-')}`}
//               className='text-primary hover:underline'>
//               Află mai multe despre {product.farmName}
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Product details tabs */}
//       <div className='mt-16'>
//         <div className='border-b border-gray-200'>
//           <nav className='flex space-x-8'>
//             <button
//               onClick={() => setActiveTab('details')}
//               className={`border-b-2 px-1 py-4 font-medium ${
//                 activeTab === 'details' ?
//                   'border-primary text-primary'
//                 : 'border-transparent text-gray-500 hover:text-gray-700'
//               }`}>
//               Detalii produs
//             </button>
//             <button
//               onClick={() => setActiveTab('reviews')}
//               className={`border-b-2 px-1 py-4 font-medium ${
//                 activeTab === 'reviews' ?
//                   'border-primary text-primary'
//                 : 'border-transparent text-gray-500 hover:text-gray-700'
//               }`}>
//               Recenzii ({product.reviewCount})
//             </button>
//             <button
//               onClick={() => setActiveTab('pickup')}
//               className={`border-b-2 px-1 py-4 font-medium ${
//                 activeTab === 'pickup' ?
//                   'border-primary text-primary'
//                 : 'border-transparent text-gray-500 hover:text-gray-700'
//               }`}>
//               Detalii de ridicare
//             </button>
//           </nav>
//         </div>

//         {/* Tab content */}
//         {activeTab === 'details' && (
//           <div className='py-6'>
//             <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
//               <div className='rounded bg-gray-50 p-4'>
//                 <span className='text-gray-500'>Categorie:</span>
//                 <span className='float-right font-medium'>
//                   {formatCategoryName(product.category)}
//                 </span>
//               </div>
//               <div className='rounded bg-gray-50 p-4'>
//                 <span className='text-gray-500'>Fermă:</span>
//                 <span className='float-right font-medium'>
//                   {product.farmName}
//                 </span>
//               </div>
//               <div className='rounded bg-gray-50 p-4'>
//                 <span className='text-gray-500'>Proveniență:</span>
//                 <span className='float-right font-medium'>Locală</span>
//               </div>
//               <div className='rounded bg-gray-50 p-4'>
//                 <span className='text-gray-500'>Organic:</span>
//                 <span className='float-right font-medium'>Da</span>
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === 'reviews' && <ReviewsSection product={product} />}

//         {activeTab === 'pickup' && <PickupDetailsSection product={product} />}
//       </div>

//       {/* Farm location map */}
//       <div className='mt-10'>
//         <h3 className='mb-4 text-lg font-semibold'>Locația fermei</h3>
//         <FarmLocationMap location={product.location} />
//       </div>

//       {/* Related products */}
//       <div className='mt-16'>
//         <h2 className='mb-6 text-2xl font-bold'>Produse similare</h2>
//         <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
//           {relatedProducts.map((relatedProduct) => (
//             <div
//               key={relatedProduct.id}
//               className='overflow-hidden rounded-lg bg-white shadow-md transition hover:shadow-lg'>
//               <Link to={`/product/${relatedProduct.id}`}>
//                 <div className='h-48 overflow-hidden'>
//                   <img
//                     src={relatedProduct.imageUrl}
//                     alt={relatedProduct.name}
//                     className='h-full w-full object-cover transition duration-300 hover:scale-105'
//                   />
//                 </div>
//               </Link>
//               <div className='p-4'>
//                 <Link to={`/product/${relatedProduct.id}`}>
//                   <h3 className='hover:text-primary font-medium text-gray-800'>
//                     {relatedProduct.name}
//                   </h3>
//                 </Link>
//                 <p className='mb-2 text-sm text-gray-600'>
//                   {relatedProduct.farmName}
//                 </p>
//                 <div className='flex items-center justify-between'>
//                   <span className='font-bold'>
//                     {relatedProduct.price.toFixed(2)} lei
//                   </span>
//                   <StarRating
//                     rating={relatedProduct.rating}
//                     reviewCount={relatedProduct.reviewCount}
//                   />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
