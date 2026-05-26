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
    const payload: CreateUserData = {
      nome: validated.data.nome,
      email: validated.data.email,
      senha: validated.data.senha,
      confirmarSenha: validated.data.confirmarSenha,
      cpf: validated.data.cpf,
      checkTermo: validated.data.checkTermo,
    };
    await useCase.execute(JSON.stringify(payload));
    revalidatePath('/', 'layout');
  } catch (error) {
    return {
      success: false,
      message:
        (error as string) ||
        'Falha ao criar usuário. Tente novamente mais tarde.',
    };
  }

  return {
    success: true,
    message: 'Usuário criado com sucesso.',
  };
}
