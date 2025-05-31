import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { QueryClient } from '@tanstack/react-query';
import { sessionQueryOptions } from '@/api/auth/queries';
import { Toaster } from '@/components/ui/sonner';

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
      <Toaster theme='light' />
      <ReactQueryDevtools buttonPosition='top-right' />
      <TanStackRouterDevtools position='bottom-right' />
    </>
  );
}
