'use server';

import api from '@/infra/http/api';
import { ApiBookRepository } from '@/infra/repositories/book/book.repository';

export async function loadBookByIdAction(id: number) {
  try {
    const repository = new ApiBookRepository(api);

    const response = await repository.buscarPorId(id);

    return {
      success: true,
      response: response.data,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : typeof error === 'object' && error !== null && 'error' in error
          ? String(error.error)
          : String(error);

    return {
      success: false,
      message:
        errorMessage ||
        'Falha ao carregar informações do livro. Tente novamente mais tarde.',
    };
  }
}
