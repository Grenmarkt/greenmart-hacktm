import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from '@tanstack/react-router';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Input } from './ui/input';

type propType = {
  onSubmit: (email: string, password: string) => void;
};

const formSchema = z.object({
  email: z.string().email({ message: 'Adresa de email invalida.' }),
  password: z.string().min(8, {
    message: 'Parola trebuie sa fie formata din cel putin 8 caractere',
  }),
});

export function SignInForm({ onSubmit }: propType) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  return (
    <Card className='w-[80%] max-w-3xl px-8 py-10'>
      <CardHeader>
        <CardTitle>Intra in cont</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(({ email, password }) =>
              onSubmit(email, password),
            )}
            className='space-y-8'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='shadcn' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parola</FormLabel>
                  <FormControl>
                    <Input placeholder='shadcn' type='password' {...field} />
                  </FormControl>
                  <FormDescription>
                    Parola trebuie sa contina cel putin 8 caractere
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit'>Intra in cont</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className='flex items-center gap-2'>
        <p>Nu ai cont?</p>
        <Link to='/signup' className='cursor-pointer hover:underline'>
          Crează un cont
        </Link>
      </CardFooter>
    </Card>
  );
}
