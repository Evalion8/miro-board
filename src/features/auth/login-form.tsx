import { Button } from '@/shared/ui/kit/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/shared/ui/kit/form';
import { Input } from '@/shared/ui/kit/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '../../../node_modules/@hookform/resolvers/zod/src/zod';
import { useLogin } from './use-login';

const loginSchema = z.object({
  email: z.string().email('Incorrect email'),
  password: z.string().min(6, 'Password must be at least 6 symbols'),
});

export function LoginForm() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { errorMessage, isPending, login } = useLogin();
  const onSubmit = form.handleSubmit(login);
  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="admin@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="******" type="password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        {errorMessage && (
          <p className="text-destructive text-sm">{errorMessage}</p>
        )}
        <Button disabled={isPending} type="submit" className="mt-4">
          Enter
        </Button>
      </form>
    </Form>
  );
}
