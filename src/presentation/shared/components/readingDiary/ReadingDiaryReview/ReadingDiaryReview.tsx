'use client';

import { useState } from 'react';
import { BookHeart, Check, ChevronDown, Star } from 'lucide-react';

export interface ReadingDiaryReviewProps {
  nota: number;
  tituloDaResenha: string | null;
  resenha: string | null;
  spoilers: boolean;
}

export function ReadingDiaryReview({
  nota,
  tituloDaResenha,
  resenha,
  spoilers,
}: ReadingDiaryReviewProps) {
  const [tituloResenha, setTituloResenha] = useState(tituloDaResenha ?? '');
  const [spoiler, setSpoiler] = useState(spoilers);
  const [menuOpen, setIsMenuOpen] = useState(false);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState('Selecione');

  const safeRating = nota ?? 0;
  const fullStars = Math.floor(safeRating);
  const hasHalfStar = safeRating % 1 >= 0.5;

  return (
    <div className="py-5 lg:py-8">
      <div className="bg-secondary-bg border border-border rounded-md p-3">
        <h2 className="flex items-center gap-2 text-text-primary text-sm lg:text-md font-semibold pb-2">
          <BookHeart size={16} /> Avalie o Livro
        </h2>

        <h1 className="text-text-primary text-xs pt-3 pb-2">
          Sua Avaliação<span className="text-brand">*</span>
        </h1>

        <div className="flex flex-col gap-2 lg:gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {Array.from({ length: fullStars }).map((_, index) => (
                <Star
                  key={`full-${index}`}
                  className="w-6 h-6 text-active fill-active"
                />
              ))}

              {hasHalfStar && (
                <div className="relative inline-block w-6 h-6">
                  <div className="absolute top-0 left-0 w-1/2 h-full overflow-hidden text-active">
                    <Star className="w-6 h-6 fill-active" />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="h-px bg-border" />

          <div className="flex-1 flex flex-col gap-1">
            <label className="text-text-primary text-xs">
              Título da Resenha
              <span className="pl-1 text-[8px]">
                (opcional, max. 250 caracteres.)
              </span>
            </label>

            <input
              type="text"
              maxLength={250}
              placeholder="Dê um título à sua resenha"
              value={tituloResenha}
              onChange={(e) => setTituloResenha(e.target.value)}
              className="w-full bg-secondary-bg border border-border rounded px-3 py-2 text-text-primary text-xs outline-none"
            />

            <span className="text-text-primary/50 text-[10px] self-start">
              {tituloResenha.length}/250
            </span>

            <label className="flex items-center space-x-3 py-4 text-text-secondary cursor-pointer select-none">
              <input
                type="checkbox"
                checked={spoiler}
                onChange={(e) => setSpoiler(e.target.checked)}
                className="sr-only"
              />

              <div className="flex items-center justify-center w-4 h-4 rounded-md border border-border/50">
                {spoiler && <Check className="w-3 h-3 stroke-3" />}
              </div>

              <span className="text-xs">Contém spoilers</span>
            </label>

            <label className="text-text-primary text-xs">
              Resenha
              <span className="pl-1 text-[8px]">
                (opcional, min. 100 caracteres.)
              </span>
            </label>

            <textarea
              data-testid="input-resenha"
              placeholder="Escreva sua resenha aqui"
              rows={6}
              defaultValue={resenha ?? ''}
              className="w-full bg-secondary-bg border border-border rounded px-2 py-1 lg:px-3 lg:py-2 text-text-primary text-xs outline-none resize-none"
              id="resenha"
            />

            <h1 className="text-text-primary text-xs pt-4">Compartilhamento</h1>

            <div className="flex flex-col lg:flex-row lg:flex-wrap justify-start gap-2">
              <div className="relative w-full lg:w-auto">
                <button
                  type="button"
                  data-testid="btn-add-lista"
                  onClick={() => setIsMenuOpen(!menuOpen)}
                  className="w-full lg:w-70 flex items-center justify-between lg:mr-6 px-4 py-3 text-xs rounded-xs transition-opacity duration-200 text-white hover:brightness-110 cursor-pointer bg-border"
                >
                  {opcaoSelecionada}

                  <ChevronDown size={16} className="text-text-primary/60" />
                </button>

                {menuOpen && (
                  <div className="absolute left-0 mt-2 w-full lg:w-max bg-card-bg border border-border rounded-lg shadow-lg z-50">
                    <button
                      type="button"
                      data-testid="profile-button"
                      onClick={() => {
                        setOpcaoSelecionada('Resenha pública');
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-3 text-sm text-text-primary hover:text-brand"
                    >
                      Resenha pública
                    </button>

                    <div className="mx-4 h-px bg-border" />

                    <button
                      type="button"
                      data-testid="profile-button"
                      onClick={() => {
                        setOpcaoSelecionada('Resenha privada');
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-3 text-sm text-text-primary hover:text-brand"
                    >
                      Resenha privada
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
