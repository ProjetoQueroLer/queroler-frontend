'use server';

import api from '@/infra/http/api';
import { ApiBookRepository } from '@/infra/repositories/book/book.repository';

export async function loadBookReadingPageAction() {
  try {
    const repository = new ApiBookRepository(api);

    const response = await repository.buscarTelaDeLeitura();

    return {
      success: true,
      response: response.data,
    };
  } catch {
    return {
      success: false,
      message: 'Não foi possível carregar a tela de leitura do usuário.',
    };
  }
}
