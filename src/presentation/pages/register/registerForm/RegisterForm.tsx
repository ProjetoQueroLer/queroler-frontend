'use client';

import {
  Button,
  Input,
  FieldError,
  Checkbox,
  AuthFields,
} from '@/presentation/shared/components';
import { ArrowRight } from 'lucide-react';
import { useRegisterForm } from '@/presentation/pages/register/registerForm/useRegisterForm';
import { useHookFormMask } from 'use-mask-input';
import { HeaderRegisterForm } from '@/presentation/pages/register/headerForm/HeaderRegisterForm';
import { LogoHeader } from '@/presentation/pages/login';
import { CreateUserDTO } from '@/core/application/user/create-user.dto';
import { createUserAction } from '@/app/actions/createUser.actions';

import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export function RegisterForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useRegisterForm();
  const registerWithMask = useHookFormMask(register);

  const submitData = async (data: CreateUserDTO) => {
    const result = await createUserAction(data);
    if (!result?.success) {
      toast.error(result?.message);
      return;
    }
    toast.success('Usuário criado com sucesso! Redirecionando para login...');
    router.push('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full">
        <LogoHeader />
        <div
          className="w-full max-w-2xl p-4 sm:p-8 rounded-xl bg-background-secondary shadow-lg mx-auto"
          data-testid="register-form-container"
        >
          <HeaderRegisterForm />
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            data-testid="register-form"
            onSubmit={handleSubmit(submitData)}
            noValidate
          >
            <div className="flex flex-col gap-4">
              <div>
                <Input
                  label="Nome"
                  id="nome"
                  placeholder="Seu nome completo"
                  dataTestId="input-nome"
                  {...register('nome')}
                  aria-invalid={!!errors.nome}
                />
                <FieldError message={errors.nome?.message as string} />
              </div>
              <AuthFields
                register={{
                  email: register('email'),
                  password: register('senha'),
                }}
                errors={{
                  email: errors.email,
                  password: errors.senha,
                }}
              />
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <Input
                  label="Confirmar Senha"
                  type="password"
                  id="confirmarSenha"
                  placeholder="Confirme sua senha"
                  dataTestId="input-confirmarSenha"
                  autoComplete="new-password"
                  {...register('confirmarSenha')}
                  aria-invalid={!!errors.confirmarSenha}
                />
                <FieldError
                  message={errors.confirmarSenha?.message as string}
                />
              </div>
              <div>
                <Input
                  label="CPF"
                  id="cpf"
                  placeholder="Seu CPF"
                  dataTestId="input-cpf"
                  maxLength={14}
                  {...registerWithMask('cpf', '999.999.999-99')}
                  aria-invalid={!!errors.cpf}
                />
                <FieldError message={errors.cpf?.message as string} />
              </div>
              <div className="flex flex-col h-full gap-2 align-center justify-center">
                <div className="mt-2">
                  <Checkbox
                    id="checkTermo"
                    label="Aceito os termos de uso"
                    error={!!errors.checkTermo}
                    data-testid="input-termo"
                    {...register('checkTermo')}
                    aria-invalid={!!errors.checkTermo}
                  />
                </div>
                <FieldError message={errors.checkTermo?.message as string} />
              </div>
            </div>

            <div className="md:col-span-2 mt-8">
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
