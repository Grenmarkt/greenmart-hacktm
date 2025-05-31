import { useMutation, useQuery } from '@tanstack/react-query';
import { sessionQueryOptions } from './queries';
import { auth } from '@/lib/auth/client';
import { queryClient } from '../client';
import { router } from '@/lib/router';

import { toast } from 'sonner';

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
  return useMutation({
    mutationKey: ['auth', 'signup'] as const,
    mutationFn: (signupData: SignupData) => auth.signUp.email(signupData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: sessionQueryOptions.queryKey,
        exact: true,
      });
      router.navigate({ to: '/protected' });
    },
  });
}

export function useSignin() {
  return useMutation({
    mutationKey: ['auth', 'signin'] as const,
    mutationFn: (signinData: SigninData) => auth.signIn.email(signinData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: sessionQueryOptions.queryKey,
        exact: true,
      });
      router.navigate({ to: '/protected' });
    },
    onError: () => {
      toast.error('Autentificare eșuată', {
        description: 'Emailul sau parola sunt greșite',
      });
    },
  });
}

export function useSignout() {
  return useMutation({
    mutationKey: ['auth', 'signout'] as const,
    mutationFn: () => auth.signOut(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: sessionQueryOptions.queryKey,
        exact: true,
      });
      router.navigate({ to: '/' });
    },
  });
}
