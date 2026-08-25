'use client';

import { NotebookPen, Plus } from 'lucide-react';
import { LoadReadingDiaryTrackingResponseDTO } from '@/core/application/diary/load-reading-diary-response.dto';

export interface ReadingDiaryTrackingProps {
  numeroDePaginas: number;
  acompanhamentos: LoadReadingDiaryTrackingResponseDTO[];
}

export function ReadingDiaryTracking({
  numeroDePaginas,
  acompanhamentos,
}: ReadingDiaryTrackingProps) {
  return (
    <div className="bg-secondary-bg border border-border rounded-md p-3">
      <h2 className="flex items-center gap-2 text-text-primary text-sm lg:text-md font-semibold pb-5">
        <NotebookPen size={14} /> Acompanhamento de Leitura
      </h2>

      <div>
        <button
          type="button"
          data-testid="btn-novo-registro-diario"
          className="flex text-xs text-white hover:opacity-80 transition-opacity duration-200 font-semibold pb-5"
        >
          <Plus size={14} />
          <span className="pl-1">Novo Registro</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-1 pb-3">
        <label className="text-text-primary text-xs">
          Páginas lidas<span className="text-brand">*</span>
        </label>

        <input
          data-testid="input-paginas"
          className="w-full bg-secondary-bg border border-border rounded px-2 py-1 lg:px-3 lg:py-3 text-text-primary text-xs"
          placeholder={`1-${numeroDePaginas}`}
          id="numero-paginas-lidas"
        />
      </div>

      <div className="flex-1 flex flex-col gap-1">
        <label className="text-text-primary text-xs">Comentários</label>

        <textarea
          data-testid="input-comentarios"
          placeholder="Suas anotações privadas sobre esta seção de leitura"
          rows={6}
          className="w-full bg-secondary-bg border border-border rounded px-2 py-1 lg:px-3 lg:py-2 text-text-primary text-xs outline-none resize-none"
          id="comentarios"
        />
      </div>

      <div className="flex justify-end gap-4 py-4">
        <button
          data-testid="btn-salvar-registro"
          type="submit"
          disabled
          className="px-10 py-3 text-xs text-white rounded-lg bg-brand font-bold hover:opacity-80"
        >
          Salvar registro
        </button>
      </div>

      <div className="h-px bg-border" />

      <div>
        <h1 className="text-text-primary text-xs py-4">Histórico</h1>

        {acompanhamentos.map((acompanhamento) => (
          <div
            key={acompanhamento.id}
            className="bg-secondary-bg border border-border rounded-md p-3 mb-3"
          >
            <h2 className="flex items-center gap-2 text-text-primary text-sm lg:text-md font-semibold pb-2">
              <NotebookPen size={16} />
              {acompanhamento.paginaFinal} páginas lidas
            </h2>

            <div className="pt-3 pb-8">
              <div className="bg-black border border-border rounded-md p-3">
                <p className="flex items-center gap-2 text-text-primary/50 text-sm lg:text-md font-thin">
                  {acompanhamento.comentario}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
