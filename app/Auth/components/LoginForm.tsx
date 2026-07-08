import { useState } from 'react';
import { useAuth } from '~/hooks/useAuth';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa6';

interface LoginFormProps {
  onSuccess?: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, clearError } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    try {
      const result = await login(email, password);
      if (result.meta.requestStatus === 'fulfilled') {
        onSuccess?.();
      }
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <Card className="w-full max-w-sm border-none shadow-none ring-0">
      <CardHeader>
        <CardTitle className="py-5">Login</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-[#3A3541]">
                Business Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password" className="text-[#3A3541]">
                  Password
                </Label>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="flex justify-end text-[#136DEC]">
              <p>Forgot your password?</p>
            </div>
            <Button type="submit" className="w-full bg-[#136DEC] p-5" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </div>

          <CardFooter className="flex flex-col md:flex-row gap-2 px-0 mt-6  border-none w-full">
            <Button
              type="button"
              variant="outline"
              className="flex-1 px-2 py-3 md:px-3 md:py-5 rounded-[17px] border border-[#DBDCDE] w-full"
            >
              <FcGoogle />
              Signin with Google
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1 px-2 py-3 md:px-3 md:py-5 rounded-[17px] border border-[#DBDCDE] w-full"
            >
              <FaFacebook className="text-[#1877F2] text-xl" />
              Signin with Facebook
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
