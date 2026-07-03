'use client';

import { Header } from '@/presentation/shared/components/header/header';
import {
  Ban,
  BookHeart,
  BookOpen,
  CheckCircle,
  ChevronDown,
  NotebookPen,
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
              <div className="w-60 h-90 bg-border flex flex-col items-center justify-center gap-2 rounded-xl">
                <span className="text-text-secondary text-xs text-center px-4">
                  Capa não cadastrada
                </span>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-1">
                <h1 className="text-text-primary text-3xl lg:text-5xl font-bold">
                  O Morro dos Ventos Uivantes
                </h1>
                <p className="text-text-secondary text-2xl py-4 lg:pt-7 lg:text-4xl">
                  Emily Bronte
                </p>
              </div>

              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex flex-wrap gap-4 lg:gap-6">
                  <div className="text-text-primary text-lg lg:text-xl font-semibold">
                    Editora
                  </div>
                  <div className="text-text-primary text-lg lg:text-xl font-semibold">
                    Ano
                  </div>
                  <div className="text-text-primary text-lg lg:text-xl font-semibold">
                    x páginas
                  </div>
                  <div className="text-text-primary text-lg lg:text-xl font-semibold">
                    Idioma
                  </div>
                  <div className="text-text-primary text-lg lg:text-xl font-semibold">
                    ISBN x
                  </div>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row lg:flex-wrap justify-start gap-2">
                <div className="relative w-full lg:w-auto">
                  <button
                    data-testid="btn-add-lista"
                    onClick={() => setIsMenuOpen(!menuOpen)}
                    className={`w-full lg:w-70 flex items-center justify-between lg:mr-6 px-4 py-3 text-sm rounded-xs font-bold transition-opacity duration-200 text-white hover:brightness-110 cursor-pointer ${menuOpen ? 'bg-dark-purple' : 'bg-brand'}`}
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
                  className="w-full lg:w-auto lg:min-w-55 flex items-center justify-center gap-2 px-4 py-3 text-sm rounded-lg font-semibold transition-opacity duration-200 bg-dark-purple text-white hover:brightness-110 cursor-pointer whitespace-nowrap"
                >
                  <NotebookPen size={12} />
                  Diário de leitura
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
