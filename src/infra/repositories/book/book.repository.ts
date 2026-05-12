import { BookRepository } from '@/core/domain/book/book.repository';
import { IAxiosResponse } from '@/infra/http/api-response.interface';
import { AxiosInstance } from 'axios';

export class ApiBookRepository implements BookRepository {
  constructor(private readonly api: AxiosInstance) {}

  async create(dados: string, imagem?: string): Promise<void> {
    try {
      const formData = new FormData();
      if (imagem) formData.append('imagem', imagem);
      formData.append('dados', dados);
      await this.api.post('/livros', formData);
    } catch (error: unknown) {
      throw (
        (error as { response?: { data?: unknown } }).response?.data || error
      );
    }
  }

  async buscarPeloIsbn(
    isbn: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<IAxiosResponse<any, any, any, any>> {
    try {
      return await this.api.get(`/livros/buscar/${isbn}`);
    } catch (error: unknown) {
      throw (
        (error as { response?: { data?: unknown } }).response?.data || error
      );
    }
  }
}
