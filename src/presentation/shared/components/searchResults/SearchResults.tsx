'use client';

import { SearchBookResponseDTO } from '@/core/application/book/search-book-response.dto';

interface SearchResultsProps {
  livros: SearchBookResponseDTO[];
  isLoading: boolean;
}

export function SearchResults({ livros, isLoading }: SearchResultsProps) {
  return (
    <div className="bg-card-bg border border-border-default rounded-md p-4 mb-6 m-1">
      {isLoading ? (
        <div className="text-text-subtitle text-sm animate-pulse">
          Buscando livros...
        </div>
      ) : livros.length === 0 ? (
        <div className="text-text-subtitle text-sm">
          Nenhum livro encontrado para essa pesquisa.
        </div>
      ) : (
        <div>
          {livros.map((livro, _index) => {
            return <p key={livro.id}>{livro.titulo}</p>;
          })}
        </div>
      )}
    </div>
  );
}
