import { LoadReadingTrackerResponseDTO } from '@/core/application/diary/load-reading-tracker-page-response.dto';
import { AxiosResponse } from 'axios';

export interface DiaryRepository {
  carregarTelaAcompanhamentoDeLeitura(): Promise<
    AxiosResponse<LoadReadingTrackerResponseDTO[]>
  >;
}
