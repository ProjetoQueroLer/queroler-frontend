'use server';
import {
  CreateUserDTO,
  createUserSchema,
} from '@/core/application/user/create-user.dto';
import { ApiUserRepository } from '@/infra/repositories/user/create-user.repository';
import api from '@/infra/http/api';
import { revalidatePath } from 'next/cache';
import z from 'zod';
import { CreateUserUseCase } from '@/core/application/user/create-user.usecase';
import { CreateUserData } from '@/core/domain/user/user.repository';

export async function createUserAction(data: CreateUserDTO) {
  const validated = createUserSchema.safeParse(data);

  if (!validated.success) {
    const { fieldErrors } = z.flattenError(validated.error);
    return {
      success: false,
      message: 'Dados inválidos. Verifique o formulário e tente novamente.',
      errors: fieldErrors,
    };
  }

  try {
    const repository = new ApiUserRepository(api);
    const useCase = new CreateUserUseCase(repository);
    const dataDeNascimento = validated.data.dataDeNascimento
      .split('-')
      .reverse()
      .join('/');
    const payload: CreateUserData = {
      nome: validated.data.nome,
      email: validated.data.email,
      confirmarEmail: validated.data.confirmarEmail,
      senha: validated.data.senha,
      confirmarSenha: validated.data.confirmarSenha,
      cpf: validated.data.cpf,
      dataDeNascimento,
      checkTermo: validated.data.checkTermo,
    };
    await useCase.execute(JSON.stringify(payload));
    revalidatePath('/', 'layout');
  } catch (error) {
    let errorMessage = '';

    const targetError =
      error && typeof error === 'object' && 'data' in error
        ? error.data
        : error;

    if (
      Array.isArray(targetError) &&
      targetError.length > 0 &&
      'mensagem' in targetError[0] &&
      'campo' in targetError[0]
    ) {
      errorMessage = `${targetError[0].mensagem}: ${String(targetError[0].campo).charAt(0).toUpperCase() + String(targetError[0].campo).slice(1)}`;
    } else {
      errorMessage =
        error instanceof Error
          ? error.message
          : typeof error === 'object' && error !== null && 'error' in error
            ? String(error.error)
            : typeof error === 'string'
              ? error
              : '';
    }
    return {
      success: false,
      message:
        errorMessage || 'Falha ao criar usuário. Tente novamente mais tarde.',
    };
  }

  return {
    success: true,
    message: 'Usuário criado com sucesso.',
  };
}
