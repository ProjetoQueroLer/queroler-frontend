'use client';

import { Header } from '@/presentation/shared/components/header/header';
import {
  Ban,
  BookHeart,
  BookOpen,
  CheckCircle,
  ChevronDown,
  NotebookPen,
  Pencil,
  RefreshCw,
} from 'lucide-react';
import { useState } from 'react';

export function BookDetails() {
  const [menuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      <Header />

      <div className="min-h-screen lg:mx-50 flex flex-col">
        <main className="flex-1 px-4 py-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-3 lg:items-stretch">
            <div className="flex flex-col gap-3 w-full lg:w-[240px] shrink-0">
              <div className="w-60 h-95 bg-border flex flex-col items-center justify-center gap-2 rounded-xl">
                <span className="text-text-secondary text-xs text-center px-4">
                  Capa não cadastrada
                </span>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-1">
                <h1 className="text-text-primary text-2xl lg:text-4xl font-bold pb-5">
                  Título do livro
                </h1>
                <p className="text-text-secondary text-md lg:text-3xl">
                  Autor(es)
                </p>
              </div>

              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex flex-wrap gap-4 lg:gap-6">
                  <div className="text-text-primary text-lg lg:text-xl font-semibold">
                    Editora{' '}
                  </div>
                  <div className="text-text-primary text-lg lg:text-xl font-semibold">
                    Ano{' '}
                  </div>
                  <div className="text-text-primary text-lg lg:text-xl font-semibold">
                    x páginas{' '}
                  </div>
                  <div className="text-text-primary text-lg lg:text-xl font-semibold">
                    Idioma{' '}
                  </div>
                  <div className="text-text-primary text-lg lg:text-xl font-semibold">
                    ISBN x{' '}
                  </div>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row lg:flex-wrap justify-start gap-4">
                <div className="relative w-full lg:w-auto">
                  <button
                    data-testid="btn-add-lista"
                    onClick={() => setIsMenuOpen(!menuOpen)}
                    className={`w-full lg:w-70 flex items-center justify-between px-4 py-4 text-sm rounded font-bold transition-opacity duration-200 text-white hover:brightness-110 cursor-pointer ${menuOpen ? 'bg-dark-purple' : 'bg-brand'}`}
                  >
                    Adicionar à lista
                    <ChevronDown size={16} className="text-text-primary/60" />
                  </button>
                  {menuOpen && (
                    <div className="absolute left-0 mt-2 w-full lg:w-max bg-card-bg border border-border rounded-lg shadow-lg z-50">
                      <button
                        data-testid="profile-button"
                        className="w-full flex items-center gap-2 px-4 py-3 text-sm text-text-primary hover:text-brand"
                      >
                        <BookHeart size={22} className="text-desired" />
                        Quero ler
                      </button>
                      <div className="mx-4 h-px bg-text-secondary" />
                      <div className="cursor-pointer">
                        <button
                          data-testid="profile-button"
                          className="w-full flex items-center gap-2 px-4 py-3 text-sm text-text-primary hover:text-brand"
                        >
                          <BookOpen size={22} className="text-active" />
                          Estou lendo
                        </button>
                      </div>
                      <div className="mx-4 h-px bg-text-secondary" />
                      <div className="cursor-pointer">
                        <button
                          data-testid="profile-button"
                          className="w-full flex items-center gap-2 px-4 py-3 text-sm text-text-primary hover:text-brand"
                        >
                          <CheckCircle size={22} className="text-completed" />
                          Livro lidos
                        </button>
                      </div>
                      <div className="mx-4 h-px bg-text-secondary" />
                      <div className="cursor-pointer">
                        <button
                          data-testid="profile-button"
                          className="w-full flex items-center gap-2 px-4 py-3 text-sm text-text-primary hover:text-brand"
                        >
                          <Ban size={22} className="text-pause" />
                          Livros abandonados
                        </button>
                      </div>
                      <div className="mx-4 h-px bg-text-secondary" />
                      <div className="cursor-pointer">
                        <button
                          data-testid="profile-button"
                          className="w-full flex items-center gap-2 px-4 py-3 text-sm text-text-primary hover:text-brand"
                        >
                          <RefreshCw size={22} className="text-repeating" />
                          Relendo
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  data-testid="btn-reading-diary"
                  type="submit"
                  className="w-full lg:w-auto lg:min-w-55 flex items-center justify-center gap-2 py-4 text-sm rounded-lg font-bold transition-opacity duration-200 bg-dark-purple text-white hover:brightness-110 cursor-pointer whitespace-nowrap"
                >
                  <NotebookPen size={16} />
                  Diário de leitura
                </button>
              </div>
            </div>
          </div>

          <div className="py-12">
            <div className="border border-border-default rounded-md p-4">
              <h2 className="flex items-center gap-2 text-text-primary text-md lg:text-lg font-semibold pb-6">
                <Pencil size={16} />
                Sinopse
              </h2>
              <p className="font-thin text-primary text-sm lg:text-base">
                Sinopse do livro aqui.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
