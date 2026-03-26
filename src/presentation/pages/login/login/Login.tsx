import { LogoHeader, LoginForm } from '@/presentation/pages/login';

export const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <LogoHeader />
      <LoginForm />
    </div>
  );
};
