import { BookRepository } from '@/core/domain/book/book.repository';
import { IAxiosResponse } from '@/infra/http/api-response.interface';

export class FindBookByIsbnUseCase {
  constructor(private bookRepository: BookRepository) {}

  async execute(
    isbn: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<IAxiosResponse<any, any, any, any>> {
    return await this.bookRepository.buscarPeloIsbn(isbn);
  }
}
