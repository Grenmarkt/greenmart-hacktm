import { useMutation, useQuery } from '@tanstack/react-query';
import { sessionQueryOptions } from './queries';
import { auth } from '@/lib/auth/client';
import { queryClient } from '../client';

import { toast } from 'sonner';
import { useRouter } from '@tanstack/react-router';

type SignupData = {
  name: string;
  email: string;
  password: string;
  image?: string;
};

type SigninData = {
  email: string;
  password: string;
};

export function useSession() {
  return useQuery(sessionQueryOptions);
}

export function useSignup() {
  const router = useRouter();
  return useMutation({
    mutationKey: ['auth', 'signup'] as const,
    mutationFn: (signupData: SignupData) => auth.signUp.email(signupData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: sessionQueryOptions.queryKey,
        exact: true,
      });
      router.navigate({ to: '/' });
    },
  });
}

export function useSignin() {
  const router = useRouter();
  return useMutation({
    mutationKey: ['auth', 'signin'] as const,
    mutationFn: (signinData: SigninData) => auth.signIn.email(signinData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: sessionQueryOptions.queryKey,
        exact: true,
      });
      router.navigate({ to: '/' });
    },
    onError: () => {
      toast.error('Autentificare eșuată', {
        description: 'Emailul sau parola sunt greșite',
      });
    },
  });
}

export function useSignout() {
  const router = useRouter();
  return useMutation({
    mutationKey: ['auth', 'signout'] as const,
    mutationFn: () => auth.signOut(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: sessionQueryOptions.queryKey,
        exact: true,
      });
      router.invalidate();
    },
  });
}
