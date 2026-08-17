'use client';

import { Input } from '@/presentation/shared/components';

interface ReadingDiaryTimelineProps {
  inicioDaLeitura?: string | null;
  terminoDaLeitura?: string | null;
}

function formatarDataParaInput(data?: string | null): string {
  if (!data) return '';
  const [dataParte] = data.split(' ');
  if (!dataParte) return '';
  const [dia, mes, ano] = dataParte.split('/');
  if (!dia || !mes || !ano) return '';
  return `${ano}-${mes}-${dia}`;
}

export function ReadingDiaryTimeline({
  inicioDaLeitura,
  terminoDaLeitura,
}: ReadingDiaryTimelineProps) {
  const hoje = new Date();
  const anoLimite = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const dia = String(hoje.getDate() - 1).padStart(2, '0');

  const dataInicio = formatarDataParaInput(inicioDaLeitura);
  const dataTermino = formatarDataParaInput(terminoDaLeitura);

  return (
    <div className="py-5 lg:py-8">
      <div className="bg-secondary-bg border border-border rounded-md p-3">
        <h2 className="flex items-center gap-2 text-text-primary text-sm lg:text-md font-semibold pb-2">
          Cronologia de Leitura
        </h2>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="text-text-primary text-xs">
              Data de início <span className="text-brand">*</span>
            </label>

            <Input
              id="dataDeInicio"
              type="date"
              max={`${anoLimite}-${mes}-${dia}`}
              dataTestId="input-data-inicio"
              className="text-xs text-text-primary uppercase w-full"
              value={dataInicio}
              //Campo está como readOnly até fazer a edição do diario de leitura
              readOnly
            />
          </div>

          <div>
            <label className="text-text-primary text-xs">Data de término</label>

            <Input
              id="dataDeTermino"
              type="date"
              max={`${anoLimite}-${mes}-${dia}`}
              dataTestId="input-data-termino"
              className="text-xs text-text-primary uppercase w-full"
              value={dataTermino}
              //Campo está como readOnly até fazer a edição do diario de leitura
              readOnly
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-2">
          <button
            type="button"
            data-testid="btn-cancelar"
            className="px-10 py-3 text-xs text-white rounded-lg hover:opacity-80 transition-opacity duration-200 bg-dark-purple font-bold"
          >
            Cancelar
          </button>

          <button
            data-testid="btn-salvar"
            type="submit"
            disabled
            className="px-10 py-3 text-xs text-white rounded-lg bg-brand font-bold hover:opacity-80"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
