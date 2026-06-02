import { BookRepository } from '@/core/domain/book/book.repository';
import { AxiosResponse } from 'axios';
import { BookResponseDTO } from '@/core/application/book/book-response.dto';
import { Page } from '@/core/application/book/load-book-reading-page-response.dto';
import { FindBooksByAttributeDTO } from '@/core/application/book/find-books-by-attribute.dto';

export class FindAllBooksByAttributeUseCase {
  constructor(private bookRepository: BookRepository) {}

  async execute(
    data: FindBooksByAttributeDTO
  ): Promise<AxiosResponse<Page<BookResponseDTO>>> {
    return await this.bookRepository.buscarLivrosPeloAtributo(data);
  }
}
