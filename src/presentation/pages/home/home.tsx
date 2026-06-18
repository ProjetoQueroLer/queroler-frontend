'use client';
import {
  Filtros,
  SearchBar,
} from '@/presentation/shared/components/searchBar/SearchBar';
import { Header } from '@/presentation/shared/components/header/header';
import { loadPopularBooksAction } from '@/app/actions/loadPopularBooks.actions';
import { useCallback, useEffect, useState } from 'react';
import { BookResponseDTO } from '@/core/application/book/book-response.dto';
import { toast } from 'react-toastify';
import { PopularBooks } from '@/presentation/shared/components/popularBooks/PopularBooks';
import { loadBookReadingPageAction } from '@/app/actions/loadBookReadingPage.actions';
import { BookCardProps } from '@/presentation/shared/components/bookCard/BookCard';
import { LoadBookReadingPageResponseDTO } from '@/core/application/book/load-book-reading-page-response.dto';
import { BookSection } from '@/presentation/shared/components/bookSection/BookSection';
import { Ban, BookHeart, BookOpen, CheckCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { findAllBooksByAttributeAction } from '@/app/actions/findAllBooksByAttribute.actions';
import { SearchResults } from '@/presentation/shared/components/searchResults/SearchResults';

export const Home = () => {
  const [searchParams, setSearchParams] = useState({
    filtro: 'titulo' as keyof typeof Filtros,
    termo: '',
  });
  const [livrosQueroLer, setLivrosQueroLer] = useState<BookCardProps[]>([]);
  const [livrosEstouLendo, setLivrosEstouLendo] = useState<BookCardProps[]>([]);
  const [livrosLidos, setLivrosLidos] = useState<BookCardProps[]>([]);
  const [livrosAbandonados, setLivrosAbandonados] = useState<BookCardProps[]>(
    []
  );
  const [livrosPopulares, setLivrosPopulares] = useState<
    BookResponseDTO[] | undefined
  >([]);
  // const [pages, setPages] = useState();
  // const [page, setPage] = useState();

  const estaPesquisando = searchParams.termo.trim().length > 0;

  const { data: resultadosAutocomplete = [], isFetching: loadingAutocomplete } =
    useQuery({
      queryKey: ['books-search', searchParams.filtro, searchParams.termo],
      queryFn: async () => {
        const res = await findAllBooksByAttributeAction({
          filtro: searchParams.filtro,
          termo: searchParams.termo,
        });
        return res.success ? res.response : [];
      },
      enabled: estaPesquisando,
    });

  const handleSearch = useCallback(
    (filtro: keyof typeof Filtros, termo: string) => {
      setSearchParams({ filtro, termo });
    },
    []
  );

  useEffect(() => {
    async function carregarLivrosPopulares() {
      const response = await loadPopularBooksAction();

      if (!response.success) {
        toast.error(response.message);
        return;
      }

      setLivrosPopulares(response.response?.content);
    }

    async function carregarTelaDeLeitura() {
      const result = await loadBookReadingPageAction();

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      if (!result.response) {
        return;
      }

      const response: LoadBookReadingPageResponseDTO = result.response;

      const queroLer: BookCardProps[] = [];
      const estouLendo: BookCardProps[] = [];
      const lidos: BookCardProps[] = [];
      const abandonados: BookCardProps[] = [];

      response.content.forEach((livro, index) => {
        const livroMapeado: BookCardProps = {
          id: String(index),
          title: livro.titulo,
          cover:
            livro.urlCapa === 'Capa não cadastrada.'
              ? ''
              : `${process.env.NEXT_PUBLIC_API_URL}${livro.urlCapa}`,
        };

        switch (livro.status) {
          case 'LIVROS_QUE_QUERO_LER':
            queroLer.push(livroMapeado);
            break;

          case 'LIVROS_QUE_ESTOU_LENDO':
            estouLendo.push(livroMapeado);
            break;

          case 'LIVROS_LIDOS':
            lidos.push(livroMapeado);
            break;

          case 'LIVROS_ABANDONADOS':
            abandonados.push(livroMapeado);
            break;
        }
      });

      setLivrosQueroLer(queroLer);
      setLivrosEstouLendo(estouLendo);
      setLivrosLidos(lidos);
      setLivrosAbandonados(abandonados);
    }

    carregarLivrosPopulares();
    carregarTelaDeLeitura();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto px-4 py-6 lg:px-8">
        <h1 className="text-text-primary text-2xl lg:text-3xl font-bold mb-1">
          Leituras atuais, desejadas e passadas
        </h1>
        <p className="text-text-subtitle text-sm lg:text-base mb-6">
          Organize sua jornada literária e acompanhe seu progresso.
        </p>
        <SearchBar onSearch={handleSearch} />
        {estaPesquisando && (
          <SearchResults
            livros={
              'content' in resultadosAutocomplete
                ? resultadosAutocomplete.content
                : []
            }
            isLoading={loadingAutocomplete}
          />
        )}
        <PopularBooks livros={livrosPopulares} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <BookSection
            title="Quero Ler"
            tag="DESEJOS"
            tagColor="bg-desired/15 text-desired"
            icon={<BookHeart size={18} className="text-desired" />}
            livros={livrosQueroLer}
          />
          <BookSection
            title="Estou lendo"
            tag="ATIVO"
            tagColor="bg-active/15 text-active"
            icon={<BookOpen size={18} className="text-active" />}
            livros={livrosEstouLendo}
          />
          <BookSection
            title="Livros lidos"
            tag="CONCLUÍDO"
            tagColor="bg-completed/15 text-completed"
            icon={<CheckCircle size={18} className="text-completed" />}
            livros={livrosLidos}
          />
          <BookSection
            title="Abandonados"
            tag="PAUSA"
            tagColor="bg-pause/15 text-pause"
            icon={<Ban size={18} className="text-pause" />}
            livros={livrosAbandonados}
          />
        </div>
      </main>
    </div>
  );
};
