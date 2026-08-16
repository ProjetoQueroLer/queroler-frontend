import { LoadReadingTrackerResponseDTO } from '@/core/application/diary/load-reading-tracker-page-response.dto';
import { DiaryRepository } from '@/core/domain/diary/diary.repository';
import { AxiosInstance, AxiosResponse } from 'axios';

export class ApiDiaryRepository implements DiaryRepository {
  constructor(private readonly api: AxiosInstance) {}

  async carregarTelaAcompanhamentoDeLeitura(): Promise<
    AxiosResponse<LoadReadingTrackerResponseDTO[]>
  > {
    try {
      return await this.api.get<LoadReadingTrackerResponseDTO[]>(
        '/diario/acompanhamento'
      );
    } catch (error: unknown) {
      throw (
        (error as { response?: { data?: unknown } }).response?.data || error
      );
    }
  }
}
