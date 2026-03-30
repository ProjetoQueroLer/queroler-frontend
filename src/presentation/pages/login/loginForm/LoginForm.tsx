import { Button } from '@/presentation/shared/components';
import { AuthFields } from '@/presentation/shared/components/AuthFields';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { HeaderForm } from '@/presentation/pages/login';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'E-mail obrigatório')
    .max(256, 'Máximo de 256 caracteres')
    .email({ message: 'E-mail inválido' }),
  password: z
    .string()
    .min(6, 'Mínimo 6 caracteres')
    .nonempty('Senha obrigatória'),
});

type LoginFormFields = z.infer<typeof loginSchema>;

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFormFields>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
    criteriaMode: 'all',
  });

  const onSubmit = (_data: LoginFormFields) => {
    // TODO: Implementar autenticação
  };

  return (
    <div
      className="w-full max-w-md p-4 sm:p-8 rounded-xl bg-background-secondary shadow-lg"
      data-testid="login-form-container"
    >
      <HeaderForm />
      <form
        className="flex flex-col gap-4"
        data-testid="login-form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <AuthFields register={register} errors={errors} />

        <div className="flex justify-end mb-2">
          <Link
            href="/esqueci-senha"
            className="text-xs sm:text-sm text-text-secondary hover:underline transition-colors"
            data-testid="forgot-password-link"
          >
            Esqueci minha senha
          </Link>
        </div>
        <Button
          variant="primary"
          type="submit"
          iconRight={<ArrowRight size={16} />}
          data-testid="login-submit-button"
          disabled={isSubmitting || !isValid}
        >
          {isSubmitting ? 'Entrando...' : 'Entrar'}
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
            href="/register"
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
