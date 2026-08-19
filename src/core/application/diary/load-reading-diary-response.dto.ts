export interface LoadReadingDiaryResponseDTO {
  id: number;
  livro: {
    id: number;
    titulo: string;
    numeroDePaginas: number;
  };
  inicioDaLeitura: string;
  terminoDaLeitura: string | null;
  acompanhamentos: unknown[];
  nota: number;
  tituloDaResenha: string | null;
  resenha: string | null;
  spoilers: boolean;
}
