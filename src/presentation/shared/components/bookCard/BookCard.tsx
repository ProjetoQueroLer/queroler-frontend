export interface BookCardProps {
  title: string;
  author: string;
  cover: string;
  id: string;
}

export function BookCard({ title, author, cover, id }: BookCardProps) {
  return (
    <div className="w-[180px] lg:w-[280px] bg-card-bg border border-border rounded-xl shadow-xs flex-shrink-0">
      <a href={`/livros/${id}`}>
        {cover ? (
          <img
            src={cover}
            alt={title}
            className="w-full h-[150px] lg:h-[200px] object-cover rounded-t-xl"
          />
        ) : (
          <div className="w-full h-[150px] lg:h-[200px] bg-border flex flex-col items-center justify-center gap-2 rounded-t-xl">
            <span className="text-text-secondary text-xs text-center px-4">
              Capa não cadastrada
            </span>
          </div>
        )}
      </a>
      <div className="p-4 text-left">
        <span className="text-text-primary text-sm lg:text-base font-semibold">
          {title}
        </span>

        <span className="text-text-secondary flex items-center text-sm font-thin py-1 rounded-xs">
          {author}
        </span>
      </div>
    </div>
  );
}
