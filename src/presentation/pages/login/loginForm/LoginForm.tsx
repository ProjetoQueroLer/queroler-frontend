import { Button, Input } from '@/presentation/shared/components';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { HeaderForm } from '@/presentation/pages/login';

export function LoginForm() {
  return (
    <div
      className="w-full max-w-md p-4 sm:p-8 rounded-xl bg-background-secondary shadow-lg"
      data-testid="login-form-container"
    >
      <HeaderForm />
      <form className="flex flex-col gap-4" data-testid="login-form">
        <Input
          label="Email"
          type="email"
          id="email"
          placeholder="Seu e-mail"
          icon={<Mail size={18} />}
          dataTestId="input-email"
        />
        <Input
          label="Senha"
          type="password"
          id="password"
          placeholder="Sua senha"
          icon={<Lock size={18} />}
          dataTestId="input-password"
        />
        <div className="flex justify-end mb-2">
          <a
            href="#"
            className="text-xs sm:text-sm text-text-secondary hover:underline transition-colors"
            data-testid="forgot-password-link"
          >
            Esqueci minha senha
          </a>
        </div>
        <Button
          variant="primary"
          type="submit"
          iconRight={<ArrowRight size={16} />}
          data-testid="login-submit-button"
        >
          Entrar
        </Button>
        <div className="flex items-center gap-2 my-2" data-testid="divider-or">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-text-secondary uppercase">ou</span>
          <div className="flex-1 h-px bg-border" />
        </div>
        <div
          className="text-center text-sm lg:text-base mt-2 gap-1 flex justify-center"
          data-testid="register-section"
        >
          <span className="text-text-secondary">Ainda não tem conta?</span>{' '}
          <Link
            href="/cadastro"
            className="text-brand font-bold hover:underline transition-colors"
            data-testid="register-link"
          >
            Cadastre-se
          </Link>
        </div>
      </form>
    </div>
  );
}
