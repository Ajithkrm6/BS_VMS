import { useState } from 'react';
import { useAuth } from '~/hooks/useAuth';
import { Button } from '~/components/Common/Button';
import { Input } from '~/components/Common/Input';

interface LoginFormProps {
  onSuccess?: () => void;
  onToggleRegister?: () => void;
}

export function LoginForm({ onSuccess, onToggleRegister }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error, clearError } = useAuth();

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
    <div className="w-full max-w-md">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              disabled={isLoading}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <button
            onClick={onToggleRegister}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Register here
          </button>
        </div>

        {/* Demo credentials hint */}
        <div className="mt-6 p-4 bg-gray-50 rounded border border-gray-200 text-xs text-gray-600">
          <p className="font-semibold mb-2">Demo Credentials:</p>
          <p>Vendor: vendor@test.com / vendor123</p>
          <p>Customer: customer@test.com / customer123</p>
          <p>Admin: admin@test.com / admin123</p>
        </div>
      </div>
    </div>
  );
}
