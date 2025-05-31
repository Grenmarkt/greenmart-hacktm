import { createProductQuery } from '@/api/products/quries';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/products/$productId')({
  loader: ({ context, params }) => {
    return context.queryClient.ensureQueryData(
      createProductQuery(params.productId),
    );
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { productId } = Route.useParams();
  const product = useQuery(createProductQuery(productId));
  return (
    <div>
      Hello "/posts/$productId"!
      <p>{JSON.stringify(product, null, 2)}</p>
    </div>
  );
}
