import StarRating from './StarRating';

export default function ReviewsSection() {
  return (
    <div className='py-6'>
      <div className='mb-6'>
        <div className='mb-4 flex items-center justify-between'>
          <h3 className='text-xl font-semibold'>Recenzii clienți (5)</h3>
          <button className='rounded-lg bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700'>
            Scrie o recenzie
          </button>
        </div>

        {/* Rating summary */}
        <div className='mb-6 rounded-lg bg-gray-50 p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <div className='mb-2 text-3xl font-bold'>5</div>
              <StarRating />
            </div>
            <div className='text-right'>
              <div className='mb-2 text-sm text-gray-600'>
                Distribuția ratingurilor:
              </div>
              {[5, 4, 3, 2, 1].map((stars) => (
                <div key={stars} className='flex items-center text-sm'>
                  <span className='w-3'>{stars}</span>
                  <svg
                    className='mx-1 h-3 w-3 text-yellow-400'
                    fill='currentColor'
                    viewBox='0 0 20 20'>
                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                  </svg>
                  <div className='mx-2 h-2 w-16 rounded-full bg-gray-200'>
                    <div
                      className='h-2 rounded-full bg-yellow-400'
                      style={{ width: `${Math.random() * 80 + 20}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Individual reviews
      <div className='space-y-6'>
        {mockReviews.map((review) => (
          <div key={review.id} className='border-b border-gray-200 pb-6'>
            <div className='mb-2 flex items-start justify-between'>
              <div className='flex items-center'>
                <div className='mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-100'>
                  <span className='text-sm font-semibold text-green-600'>
                    {review.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </span>
                </div>
                <div>
                  <div className='flex items-center'>
                    <span className='mr-2 font-medium'>{review.name}</span>
                    {review.verified && (
                      <span className='rounded bg-green-100 px-2 py-1 text-xs text-green-700'>
                        Cumpărător verificat
                      </span>
                    )}
                  </div>
                  <div className='flex items-center text-sm text-gray-500'>
                    <StarRating rating={review.rating} reviewCount={0} />
                    <span className='ml-2'>{review.date}</span>
                  </div>
                </div>
              </div>
            </div>
            <p className='ml-13 text-gray-700'>{review.comment}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
}
