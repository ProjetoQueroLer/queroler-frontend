import { Star } from 'lucide-react';
import { BookCard } from '@/presentation/shared/components/bookCard/BookCard';

interface PopularBooksProps {
  total?: number;
}

export function PopularBooks({ total }: PopularBooksProps) {
  return (
    <div className="bg-card-bg border border-border rounded-xl px-4 py-3 lg:p-6 lg:py-6 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Star size={18} className="text-brand" />
          <span className="text-text-primary text-sm lg:text-base font-semibold">
            Livros populares
          </span>
        </div>

        <span className=" flex items-center gap-1 text-xs font-thin px-2 py-1 rounded-xs">
          {total} livros
        </span>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        <BookCard
          title="Percy Jackson e os Olimpianos: O Ladrão de Raios"
          author="Rick Riordan"
          cover="https://m.media-amazon.com/images/I/81mfMi0ni+L._UF1000,1000_QL80_.jpg"
          id="1"
        />

        <BookCard
          title="O Pequeno Príncipe"
          author="Antoine de Saint-Exupéry"
          cover=""
          id="2"
        />
      </div>
    </div>
  );
}
