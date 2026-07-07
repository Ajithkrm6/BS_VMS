import { LoginForm } from '../components/LoginForm';
import { RegisterForm } from '../components/RegisterForm';
import { ForgotPassword } from '../components/ForgotPassword';
import { useLocation } from 'react-router-dom';

interface AuthPageProps {
  onAuthSuccess?: () => void;
}

export function AuthPage({ onAuthSuccess }: AuthPageProps) {
  const location = useLocation();
  const pathname = location.pathname;
  const isRegister = pathname?.includes('/register');
  const isLogin = pathname?.includes('/login');
  const isForgotPassword = pathname?.includes('/forgot-password');

  return (
    <div className="flex h-screen w-full">
      <div className="flex flex-col items-center justify-center w-full md:w-1/2 px-6">
        <div className="mb-8 text-center">
           <img
          src="/BridgeTalentLogo.png"
          alt="Authentication illustration"
        />
        </div>
        {isLogin && <LoginForm onSuccess={() => onAuthSuccess?.()} />}
        {isRegister &&  <RegisterForm onSuccess={() => onAuthSuccess?.()}/>}
        {isForgotPassword && <ForgotPassword/>}
   
      </div>
      
      <div className="hidden md:block w-1/2 min-h-screen p-4">
        <img
          src="/auth-illustration.png"
          alt="Authentication illustration"
          className="w-full h-full object-contain rounded-lg"
        />
      </div>
    </div>
  );
}
