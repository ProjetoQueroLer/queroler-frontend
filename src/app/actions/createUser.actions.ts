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

export async function createUserAction(data: CreateUserDTO) {
  const validated = createUserSchema.safeParse(data);

  if (!validated.success) {
    const { fieldErrors } = z.flattenError(validated.error);
    return {
      success: false,
      message: 'Invalid data. Please check the form and try again.',
      errors: fieldErrors,
    };
  }

  try {
    const repository = new ApiUserRepository(api);
    const useCase = new CreateUserUseCase(repository);
    await useCase.execute(validated.data);
    revalidatePath('/', 'layout');
  } catch {
    return {
      success: false,
      message: 'Failed to create user. Please try again later.',
    };
  }

  return {
    success: true,
    message: 'User created successfully.',
  };
}
