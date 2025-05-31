import { useSignup } from '@/api/auth/hooks';
import { SignUpForm } from '@/components/SignUpForm';
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
  const onFormSubmit = (name: string, email: string, password: string) => {
    mutation.mutate({
      name: name,
      email: email,
      password: password,
    });
  };
  return (
    <div className='flex min-h-screen w-full items-center justify-center'>
      <SignUpForm onSubmit={onFormSubmit}></SignUpForm>
    </div>
  );
}
