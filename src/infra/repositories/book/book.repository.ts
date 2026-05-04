import { BookRepository } from '@/core/domain/book/book.repository';
import { AxiosInstance } from 'axios';

export class ApiBookRepository implements BookRepository {
  constructor(private readonly api: AxiosInstance) {}

  async create(dados: string, _imagem?: string): Promise<void> {
    try {
      const formData = new FormData();
      formData.append('dados', dados);
      await this.api.post('/livros', formData);
    } catch (error: unknown) {
      throw (
        (error as { response?: { data?: unknown } }).response?.data || error
      );
    }
  }
}
