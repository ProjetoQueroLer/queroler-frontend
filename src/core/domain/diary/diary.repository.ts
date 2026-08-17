import { LoadReadingTrackerResponseDTO } from '@/core/application/diary/load-reading-tracker-page-response.dto';
import { LoadReadingDiaryResponseDTO } from '@/core/application/diary/load-reading-diary-response.dto';
import { AxiosResponse } from 'axios';

export interface DiaryRepository {
  carregarTelaAcompanhamentoDeLeitura(): Promise<
    AxiosResponse<LoadReadingTrackerResponseDTO[]>
  >;

  buscarDiarioPorLivro(
    livroId: number
  ): Promise<AxiosResponse<LoadReadingDiaryResponseDTO>>;
}
