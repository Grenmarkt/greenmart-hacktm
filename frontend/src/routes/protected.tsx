import {
  createFileRoute,
  redirect,
  useLoaderData,
} from '@tanstack/react-router';

export const Route = createFileRoute('/protected')({
  beforeLoad: ({ context: { authData } }) => {
    if (!authData) {
      throw redirect({ to: '/signin' });
    }
    return { authData };
  },
  loader: ({ context: { authData } }) => {
    return { user: authData.user };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useLoaderData({ from: '/protected' });

  return <div className='p-2'>Hello, {user.name}</div>;
}
