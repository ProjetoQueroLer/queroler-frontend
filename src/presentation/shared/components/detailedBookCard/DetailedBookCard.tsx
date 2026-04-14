import {
  CircleStar,
  BookMarked,
  BookA,
  CalendarDays,
  Users,
} from 'lucide-react';

export interface DetailedBookCardProps {
  title: string;
  author: string;
  cover: string;
  publisher: string;
  id: string;
  rating?: number;
  pages?: number;
  year?: number;
  readers?: number;
}

export function DetailedBookCard({
  title,
  author,
  cover,
  publisher,
  id,
  rating,
  pages,
  year,
  readers,
}: DetailedBookCardProps) {
  return (
    <div className="relative flex flex-row w-full my-6 w-[180px] lg:w-[280px] bg-card-bg border border-border rounded-xl shadow-xs flex-shrink-0">
      <div className="relative pr-2.5 lg:w-2/5 shrink-0 overflow-hidden">
        <a href={`/livros/${id}`}>
          {cover ? (
            <img
              src={cover}
              alt={title}
              className="w-[90px] h-[140px] lg:h-full lg:w-full object-cover rounded-md"
            />
          ) : (
            <div className="w-[90px] h-[140px] lg:h-full lg:w-full bg-border flex items-center justify-center text-xs text-text-secondary rounded-md text-center px-2">
              Sem capa
            </div>
          )}
        </a>
      </div>
      <div className="flex flex-col justify-between f">
        <div>
          <h3 className="text-text-primary font-semibold text-sm leadind-tight">
            {title}
          </h3>
          <p className="text-text-primary text-sm">{author}</p>

          {rating && (
            <div className="flex items-center gap-1 mt-1 text-active text-sm">
              <CircleStar size={16} /> <span>{rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-3 text-xs text-text-secondary mt-2">
          {publisher && (
            <span className="flex items-center gap-1">
              <BookA size={14} /> {publisher}
            </span>
          )}
          {pages && (
            <span className="flex items-center gap-1">
              <BookMarked size={14} /> {pages} páginas
            </span>
          )}
          {year && (
            <span className="flex items-center gap-1">
              <CalendarDays size={14} /> {year}
            </span>
          )}
          {readers && (
            <span className="flex items-center gap-1">
              <Users size={14} /> {readers} leitores
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
