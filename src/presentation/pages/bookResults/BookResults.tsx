'use client';

import { DetailedBookCard } from '@/presentation/shared/components/detailedBookCard/DetailedBookCard';
import { SearchBar } from '@/presentation/shared/components/searchBar/SearchBar';
import { Header } from '@/presentation/shared/components/header/header';

interface BooksResultsProps {
  total?: number;
  currentPage?: number;
  totalPages?: number;
}

export const BooksResults = ({
  total,
  currentPage,
  totalPages,
}: BooksResultsProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 px-4 py-6 lg:px-8">
        <SearchBar />

        <div className="mt-4 mb-6 gap-2">
          <span className="text-sm text-text-primary font-medium mt-4 mb-2">
            {total} encontrados
          </span>
          <span className="text-sm text-text-secondary font-thin ml-1 mb-4">
            | exibindo {currentPage} a {totalPages}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <DetailedBookCard
            title="Percy Jackson e os Olimpianos: O Ladrão de Raios"
            author="Rick Riordan"
            cover="https://m.media-amazon.com/images/I/81mfMi0ni+L._UF1000,1000_QL80_.jpg"
            publisher="Tal"
            id="3"
            rating={4.8}
            pages={423}
            year={2005}
            readers={1200}
          />
          <DetailedBookCard
            title="O Pequeno Príncipe"
            author="Antoine de Saint-Exupéry"
            cover=""
            publisher="Reynal & Hitchcock"
            id="4"
            rating={4.5}
            pages={96}
            year={1943}
            readers={2000}
          />
        </div>
      </main>
    </div>
  );
};
