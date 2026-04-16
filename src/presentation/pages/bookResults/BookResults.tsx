'use client';

import { DetailedBookCard } from '@/presentation/shared/components/detailedBookCard/DetailedBookCard';
import { SearchBar } from '@/presentation/shared/components/searchBar/SearchBar';
import { Header } from '@/presentation/shared/components/header/header';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Modal } from '@/presentation/shared/components/modal/Modal';
import { useRouter } from 'next/navigation';
import { FieldError } from '@/presentation/shared/components/fieldError/FieldError';

const ITENS_POR_PAGINA = 15;

interface Livro {
  id: string;
  titulo: string;
  autores: { nome: string }[];
  editora: string;
  numeroDePaginas: number;
  anoDePublicacao: string;
  capaUrl: string;
}

interface RespostaBack {
  content: Livro[];
  totalElements: number;
  totalPages: number;
  number: number;
}

export const BooksResults = () => {
  const searchParams = useSearchParams();
  const busca = searchParams.get('busca') || '';
  const filtro = searchParams.get('filtro') || 'titulo';
  const router = useRouter();
  const [erro, setErro] = useState('');

  const [livros, setLivros] = useState<Livro[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [carregando, setCarregando] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);

  const buscarLivros = useCallback(
    async (pagina: number) => {
      setCarregando(true);
      try {
        const params = new URLSearchParams();
        if (filtro === 'titulo') params.set('titulo', busca);
        if (filtro === 'autor') params.set('autor', busca);
        if (filtro === 'editora') params.set('editora', busca);

        params.set('page', pagina.toString());
        params.set('size', ITENS_POR_PAGINA.toString());
        params.set('sort', 'dataDeCadastro,desc');

        const resposta = await fetch(`/api/livros?${params.toString()}`);

        if (!resposta.ok) return;

        const dados: RespostaBack = await resposta.json();
        setLivros(dados.content);
        setTotal(dados.totalElements);
        setTotalPaginas(dados.totalPages);

        if (dados.totalElements === 0) {
          setModalAberto(true);
        }
      } catch (error) {
        if (error instanceof Error) {
          setErro(error.message);
        } else {
          setErro('Erro inesperado.');
        }
      } finally {
        setCarregando(false);
      }
    },
    [busca, filtro]
  );

  useEffect(() => {
    if (!busca) return;
    buscarLivros(paginaAtual);
  }, [busca, filtro, buscarLivros, paginaAtual]);

  const inicioDaExibicao = paginaAtual * ITENS_POR_PAGINA + 1;
  const fimDaExibicao = Math.min((paginaAtual + 1) * ITENS_POR_PAGINA, total);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 px-4 py-6 lg:px-8 max-w-7xl mx-auto w-full">
        <SearchBar />
        <FieldError message={erro} />

        {carregando ? (
          <p className="text-center text-text-secondary mt-6">
            Buscando livros...
          </p>
        ) : (
          <>
            {total > 0 && (
              <div className="mt-4 mb-6">
                <span className="text-sm text-text-primary font-medium">
                  {total} encontrados
                </span>
                <span className="text-sm text-text-secondary font-thin ml-1">
                  | exibindo {inicioDaExibicao} a {fimDaExibicao}
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {livros.map((livro) => (
                <DetailedBookCard
                  key={livro.id}
                  id={livro.id}
                  title={livro.titulo}
                  author={livro.autores[0]?.nome || ''}
                  cover={livro.capaUrl || ''}
                  publisher={livro.editora}
                  rating={4.5}
                  pages={livro.numeroDePaginas}
                  year={Number(livro.anoDePublicacao)}
                />
              ))}
            </div>

            {totalPaginas > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => setPaginaAtual((p) => Math.max(p - 1, 0))}
                  disabled={paginaAtual === 0}
                  className="px-3 py-1 text-sm text-text-primary border border-border rounded-lg disabled:opacity-40 hover:opacity-80 cursor-pointer"
                >
                  Anterior
                </button>

                {Array.from({ length: totalPaginas }, (_, i) => i).map((i) => (
                  <button
                    key={i}
                    onClick={() => setPaginaAtual(i)}
                    className={`px-3 py-1 text-sm rounded-lg border cursor-pointer
                      ${
                        paginaAtual === i
                          ? 'bg-brand text-white border-brand'
                          : 'text-text-primary border-border hover:opacity-80'
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setPaginaAtual((p) => Math.min(p + 1, totalPaginas - 1))
                  }
                  disabled={paginaAtual === totalPaginas - 1}
                  className="px-3 py-1 text-sm text-text-primary border border-border rounded-lg disabled:opacity-40 hover:opacity-80 cursor-pointer"
                >
                  Próxima
                </button>
              </div>
            )}
          </>
        )}
      </main>
      <Modal
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        onConfirm={() => router.push('/cadastro-livro')}
      />
    </div>
  );
};
