import { useSignin } from '@/api/auth/hooks';
import { Button } from '@/components/ui/button';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/signin')({
  beforeLoad: ({ context: { authData } }) => {
    if (authData) {
      throw redirect({ to: '/protected' });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const mutation = useSignin();

  return (
    <div>
      <Button
        onClick={() =>
          mutation.mutate({
            email: 'someEmail@gmail.com',
            password: 'pass123456',
          })
        }>
        Sign in
      </Button>
      {mutation.isError && 'UPSIE'}
    </div>
  );
}
