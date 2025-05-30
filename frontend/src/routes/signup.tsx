import { useSignup } from '@/api/auth/hooks';
import { Button } from '@/components/ui/button';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/signup')({
  beforeLoad: ({ context: { authData } }) => {
    if (authData) {
      throw redirect({ to: '/protected' });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const mutation = useSignup();

  return (
    <div>
      <Button
        onClick={() =>
          mutation.mutate({
            name: 'bob',
            email: 'someEmail@gmail.com',
            password: 'pass123456',
          })
        }>
        Sign Up
      </Button>
      {mutation.isError && 'UPSIE'}
    </div>
  );
}
