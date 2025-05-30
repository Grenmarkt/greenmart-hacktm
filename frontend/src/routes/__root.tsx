import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { QueryClient } from '@tanstack/react-query';
import { sessionQueryOptions } from '@/api/auth/queries';

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    beforeLoad: async ({ context }) => {
      const authData =
        await context.queryClient.fetchQuery(sessionQueryOptions);
      return { authData };
    },
    component: RouteComponent,
  },
);

function RouteComponent() {
  return (
    <>
      <Outlet />
      <ReactQueryDevtools buttonPosition='top-right' />
      <TanStackRouterDevtools position='bottom-right' />
    </>
  );
}
