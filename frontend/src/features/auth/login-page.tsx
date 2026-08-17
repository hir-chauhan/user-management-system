import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ThemeSwitch } from '@/components/ui/theme-switch';
import { Shield, Loader2, CheckCircle2 } from 'lucide-react';


import { LoginFormValues, loginSchema } from './schema';
import { useLogin } from './hooks/use-login';

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const loginMutation = useLogin();

  const onSubmit = (values: LoginFormValues) => {
    loginMutation.mutate(values);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-muted/30 p-4 relative">
      {/* Top right Theme toggle */}
      <div className="absolute top-4 right-4">
        <ThemeSwitch />
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 rounded-2xl border bg-card shadow-xl overflow-hidden">
        {/* Left Side: Brand Promo / Information */}
        <div className="hidden md:flex flex-col justify-between p-8 bg-gradient-to-br from-primary/10 via-primary/5 to-background border-r">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold tracking-tight">
                UserVault
              </h2>
              <p className="text-xs text-muted-foreground">Management Portal</p>
            </div>
          </div>

          <div className="space-y-4 py-8">
            <h3 className="text-2xl font-bold tracking-tight text-foreground">
              Enterprise Grade User Management
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Secure authentication, responsive tables, real-time search &amp; filters, and end-to-end CRUD operations.
            </p>

            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-2 text-xs font-medium text-foreground">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>JWT Authentication &amp; Role Protection</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-foreground">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Debounced Search &amp; Server Pagination</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-foreground">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Light &amp; Dark Mode Support</span>
              </div>
            </div>
          </div>

          <div className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} UserVault Inc. All rights reserved.
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="flex flex-col justify-center p-6 sm:p-10">
          <CardHeader className="p-0 pb-6">
            <div className="md:hidden flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Shield className="h-4 w-4" />
              </div>
              <span className="font-bold text-base">UserVault</span>
            </div>
            <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
            <CardDescription className="text-sm">
              Enter your credentials to access your account.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0">
            <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="name@company.com"
                  {...register('email')}
                  disabled={loginMutation.isPending}
                />
                {errors.email && (
                  <p className="text-xs text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  Password
                </label>
                <PasswordInput
                  placeholder="••••••••"
                  {...register('password')}
                  disabled={loginMutation.isPending}
                />
                {errors.password && (
                  <p className="text-xs text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full mt-2 gap-2"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
                Sign In
              </Button>
            </form>
          </CardContent>
        </div>
      </div>
    </div>
  );
}
