'use client';

import { useState, useEffect } from 'react';
import { BookCard } from '@/presentation/shared/components/bookCard/BookCard';
import { mockSearchResults21 } from '@/presentation/shared/components/searchBar/mockSearchResults';

interface Livro {
  id: string;
  titulo: string;
  autores: { nome: string }[];
  editora?: string;
  capaUrl: string | null;
  numeroDePaginas: number;
  anoDePublicacao: string;
}

interface BookResultsProps {
  query: string;
  filtro: string;
}

interface RespostaBack {
  content: Livro[];
  totalElements: number;
}

export function BookResults({ query, filtro }: BookResultsProps) {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [erro, setErro] = useState('');
  const itensPorPagina = 15;

  useEffect(() => {
    async function buscarLivros() {
      try {
        if (!query.trim()) {
          setLivros([]);
          return;
        }

        // const resposta = await fetch(
        //   `${process.env.NEXT_PUBLIC_API_URL}/livros/busca?query=${query}`
        // );

        // if (!resposta.ok) return;

        // const dados: RespostaBack = await resposta.json();

        const dados = mockSearchResults21;

        const termo = query.toLowerCase();

        const filtrados = dados.content
          .filter((livro) => {
            if (filtro === 'Título') {
              return livro.titulo.toLowerCase().includes(termo);
            }

            if (filtro === 'Autor(a)') {
              return livro.autores?.some((autor) =>
                autor.nome.toLowerCase().includes(termo)
              );
            }

            if (filtro === 'Editora') {
              return livro.editora?.toLowerCase().includes(termo);
            }

            return false;
          })
          .sort((a, b) => Number(a.id) - Number(b.id));

        setLivros(filtrados);
        setPaginaAtual(1);
      } catch (error) {
        if (error instanceof Error) {
          setErro(error.message);
        } else {
          setErro('Erro inesperado.');
        }
      }
    }

    buscarLivros();
  }, [query, filtro]);

  const totalPaginas = Math.ceil(livros.length / itensPorPagina);

  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;

  const livrosPaginados = livros.slice(inicio, fim);

  function voltarPagina() {
    window.history.back();
  }

  return (
    <div className="min-h-screen bg-background px-4 py-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={voltarPagina}
          className="text-sm text-text-secondary hover:underline"
        >
          ← Voltar
        </button>

        <span className="text-text-primary text-lg font-semibold">
          Resultados para "{query}"
        </span>

        <div />
      </div>

      {livros.length === 0 && (
        <div className="text-center text-text-secondary mt-10">
          Nenhum livro encontrado
        </div>
      )}

      {livros.length > 0 && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {livrosPaginados.map((livro) => (
              <BookCard
                key={livro.id}
                id={livro.id}
                title={livro.titulo}
                author={livro.autores?.[0]?.nome || ''}
                cover={livro.capaUrl || ''}
                editora={livro.editora}
                numeroDePaginas={livro.numeroDePaginas}
                anoDePublicacao={livro.anoDePublicacao}
              />
            ))}
          </div>

          {totalPaginas > 1 && (
            <div className="flex justify-center mt-8 gap-2 flex-wrap">
              {Array.from({ length: totalPaginas }, (_, index) => {
                const pagina = index + 1;

                return (
                  <button
                    key={pagina}
                    onClick={() => setPaginaAtual(pagina)}
                    className={`px-3 py-1 rounded-md text-sm border
                      ${
                        paginaAtual === pagina
                          ? 'bg-brand text-white border-brand'
                          : 'bg-card-bg text-text-primary border-border hover:bg-search-border'
                      }`}
                  >
                    {pagina}
                  </button>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
