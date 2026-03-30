import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Mail, Lock } from 'lucide-react';
import { Input } from '@/presentation/shared/components/input/Input';
import { FieldError } from '@/presentation/shared/components/fieldError/FieldError';

type AuthFieldsValues = { email: string; password: string };

interface AuthFieldsProps {
  register: UseFormRegister<AuthFieldsValues>;
  errors: FieldErrors<AuthFieldsValues>;
}

export function AuthFields({ register, errors }: AuthFieldsProps) {
  return (
    <>
      <div>
        <Input
          label="Email"
          type="email"
          id="email"
          placeholder="Seu e-mail"
          icon={<Mail size={18} />}
          dataTestId="input-email"
          autoComplete="email"
          maxLength={256}
          {...register('email')}
          aria-invalid={!!errors['email']}
        />
        <FieldError message={errors['email']?.message as string} />
      </div>
      <div>
        <Input
          label="Senha"
          type="password"
          id="password"
          placeholder="Sua senha"
          icon={<Lock size={18} />}
          dataTestId="input-password"
          autoComplete="current-password"
          {...register('password')}
          aria-invalid={!!errors['password']}
        />
        <FieldError message={errors['password']?.message as string} />
      </div>
    </>
  );
}
