import { useSignin } from '@/api/auth/hooks';
import { SignInForm } from '@/components/SignInForm';
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
  const onFormSubmit = (email: string, password: string) => {
    mutation.mutate({
      email: email,
      password: password,
    });
  };

  return (
    <div className='flex min-h-screen w-full items-center justify-center'>
      <SignInForm onSubmit={onFormSubmit}></SignInForm>
    </div>
  );
}
