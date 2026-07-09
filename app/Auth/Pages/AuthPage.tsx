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
    <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] min-h-screen w-full bg-gray-50/50">
      
      {/* Left Column: Handles Form Alignment & Scrolling */}
      <div className="w-full flex flex-col items-center justify-start px-6 py-12 md:py-16 min-h-screen">
        
        {/* Universal Logo Header */}
        <div className="mb-8 text-center shrink-0 w-full max-w-xl">
          <img
            src="/BridgeTalentLogo.png"
            alt="BridgeTalent Logo"
            className="mx-auto h-16 object-contain"
          />
        </div>

        {/* Form Container: Forces all child forms to align to the same width */}
        <div className="w-full max-w-xl flex flex-col items-center justify-center flex-1">
          {isLogin && <LoginForm onSuccess={() => onAuthSuccess?.()} />}
          {isRegister && <RegisterForm onSuccess={() => onAuthSuccess?.()} />}
          {isForgotPassword && <ForgotPassword />}
        </div>
        
      </div>
      
      {/* Right Column: Sticky Desktop Illustration */}
      <div className="hidden md:block h-screen sticky top-0 p-4 bg-white">
        <img
          src="/auth-illustration.png"
          alt="Authentication illustration"
          className="w-full h-full object-cover rounded-2xl shadow-sm"
        />
      </div>

    </div>
  );
}
