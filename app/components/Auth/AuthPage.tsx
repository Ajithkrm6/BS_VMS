import { useState } from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

interface AuthPageProps {
  onAuthSuccess?: () => void;
}

export function AuthPage({ onAuthSuccess }: AuthPageProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">BS-VMS</h1>
          <p className="text-gray-600">Vendor Management System</p>
        </div>

        {mode === 'login' ? (
          <LoginForm
            onSuccess={() => {
              onAuthSuccess?.();
            }}
            onToggleRegister={() => setMode('register')}
          />
        ) : (
          <RegisterForm
            onSuccess={() => {
              onAuthSuccess?.();
            }}
            onToggleLogin={() => setMode('login')}
          />
        )}
      </div>
    </div>
  );
}
