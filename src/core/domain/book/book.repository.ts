import { FindBookByIsbnResponseDTO } from '@/core/application/book/find-book-by-isbn-response.dto';
import { LoadBookReadingPageResponseDTO } from '@/core/application/book/load-book-reading-page-response.dto';
import { AxiosResponse } from 'axios';

export interface CreateBookData {
  titulo: string;
  isbn: string;
  editora: string;
  anoDePublicacao: string;
  numeroDePaginas: string;
  idioma: string;
  sinopse: string;
  autores: { nome: string }[];
}

export interface BookRepository {
  create(dados: string, imagem?: File): Promise<void>;
  buscarPeloIsbn(
    isbn: string
  ): Promise<AxiosResponse<FindBookByIsbnResponseDTO>>;

  buscarCapaDoLivro(route: string): Promise<AxiosResponse<ArrayBuffer>>;
  buscarTelaDeLeitura(): Promise<AxiosResponse<LoadBookReadingPageResponseDTO>>;
}
