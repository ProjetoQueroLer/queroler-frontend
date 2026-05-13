'use server';

import { GetBookImageUseCase } from '@/core/application/book/get-book-image.usecase';
import api from '@/infra/http/api';
import { ApiBookRepository } from '@/infra/repositories/book/book.repository';

export async function getBookImageAction(route: string) {
  try {
    const repository = new ApiBookRepository(api);
    const useCase = new GetBookImageUseCase(repository);
    const response = await useCase.execute(route);
    const blobDados = response.data;
    const tipoDoArquivo = response.headers['content-type'];
    const file = new File([blobDados], `capa.${tipoDoArquivo.split('/')[1]}`, {
      type: tipoDoArquivo,
    });
    return {
      success: true,
      response: file,
      message: 'Imagem encontrado com sucesso.',
    };
  } catch (error) {
    return {
      success: false,
      message:
        (error as string) ||
        'Falha ao buscar imagem. Tente novamente mais tarde.',
    };
  }
}
