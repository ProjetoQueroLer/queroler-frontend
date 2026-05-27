import Image from 'next/image';

export interface BookCardProps {
  title: string;
  author?: string;
  cover: string;
  id: string;
}

export function BookCard({ title, author, cover, id }: BookCardProps) {
  return (
    <div className="w-full max-w-[215px] bg-card-bg border border-border rounded-xl overflow-hidden shadow-xs transition-all duration-200 cursor-pointer hover:shadow-md hover:scale-[1.02] hover:-translate-y-1">
      <a href={`/livros/${id}`}>
        <div className="relative w-full h-[120px] lg:h-[170px]">
          {cover ? (
            <Image
              src={cover}
              alt={title}
              fill
              sizes="(max-width: 768px) 140px, 200px"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-border flex items-center justify-center">
              <span className="text-text-secondary text-xs text-center px-4">
                Capa não cadastrada
              </span>
            </div>
          )}
        </div>
      </a>

      <div className="p-4 min-h-[88px] flex flex-col">
        <span className="text-text-primary text-sm lg:text-base font-semibold line-clamp-2">
          {title}
        </span>

        {author && (
          <span className="text-text-secondary text-sm font-thin mt-1 line-clamp-1">
            {author}
          </span>
        )}
      </div>
    </div>
  );
}
