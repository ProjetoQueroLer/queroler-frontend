'use client';
import { Button } from '@/presentation/shared/components';
import { AuthFields } from '@/presentation/shared/components/AuthFields';
import { ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { HeaderRegisterForm } from '@/presentation/pages/register/headerForm/HeaderRegisterForm';
import { LogoHeader } from '@/presentation/pages/login';

const registerSchema = z.object({
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

type RegisterFormFields = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<RegisterFormFields>({
    resolver: zodResolver(registerSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
    criteriaMode: 'all',
  });

  const onSubmit = (_data: RegisterFormFields) => {
    // TODO: Implementar cadastro
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full">
        <LogoHeader />
        <div
          className="w-full max-w-md p-4 sm:p-8 rounded-xl bg-background-secondary shadow-lg mx-auto"
          data-testid="register-form-container"
        >
          <HeaderRegisterForm />
          <form
            className="flex flex-col gap-4"
            data-testid="register-form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <AuthFields register={register} errors={errors} />
            <div className="mt-8">
              <Button
                variant="primary"
                type="submit"
                iconRight={<ArrowRight size={16} />}
                data-testid="register-submit-button"
                disabled={isSubmitting || !isValid}
              >
                {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
